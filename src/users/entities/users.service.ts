import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import  * as jwt from "jsonwebtoken";
import { CreateAccountInput } from "../dtos/create-account.dto";
import { LoginInput } from "../dtos/login.dto";
import { User } from "./user.entity";
import { JwtService } from "src/jwt/jwt.service";
import { EditProfileInput } from "../dtos/edit-profile.dto";
import { Verification } from "./verification.entity";

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(User) private readonly users: Repository<User>,
        @InjectRepository(Verification) private readonly verification: Repository<Verification>,
        private readonly jwtService: JwtService
    ) {}

    async createAccount({email, password, role}: CreateAccountInput): Promise<{ok: boolean; error?: string}>{
        //check new user
        try{
            const exists = await this.users.findOne({email});
            if(exists){
                return {ok:false, error: "There is a user with that email already"};
            }
            const user = await this.users.save(this.users.create({email, password, role}));
            await this.verification.save(this.verification.create({
                user
            }),
            );
            return {ok: true};
        }catch(e){
            return {ok: false, error: "Can't make Accont"};
        }
        // create user && hash the password
    }

    async login({email, password}: LoginInput):  Promise<{ok: boolean; error?: string; token?: string}>{
        // check if the password is correct
        //make a JWT and give it to the user
        try{
            const user = await this.users.findOne({email},{select:['id','password']});//find the user with the email
            if(!user){
                return{
                    ok: false,
                    error: "User not found",
                };
            }
            const passwordCorrect = await user.checkPassword(password);
            if(!passwordCorrect){
                return{
                    ok: false,
                    error: 'Wrong Password'
                };
            }
            const token = this.jwtService.sign(user.id);
                return{
                    ok: true,
                    token,
                };
    }
        catch(error){
            return{
                ok: false,
                error,
            };
    }
}
 async findById(id:number): Promise<User>{
    return this.users.findOne({id});
 }

 async editProfile(userId: number, {email, password}: EditProfileInput): Promise<User> {
     const user = await this.users.findOne(userId);
     if(email){
         user.email = email;
         user.verified = false;
         await this.verification.save(this.verification.create({user}));
     }
     if(password){
         user.password = password
     }
     return this.users.save(user);
  }
  async verifyEmail(code:string): Promise<boolean>{
      try{
        const verification = await this.verification.findOne({code}, {relations: ['user']});
        if(verification){
            verification.user.verified = true;
            await this.users.save(verification.user);
            await this.verification.delete(verification.id);
            return true;
        }
      }catch(error){
          console.log(error);
          return false
      }
  }
}