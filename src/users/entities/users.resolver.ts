import { UseGuards } from '@nestjs/common';
import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto';
import { EditProfileInput, EditProfileOutput } from '../dtos/edit-profile.dto';
import { LoginInput, LoginOutput } from '../dtos/login.dto';
import { UserProfileInput, UserProfileOutput } from '../dtos/user-profile.dto';
import { User } from "./user.entity";
import { UsersService } from "./users.service";


@Resolver(() => User)
export  class UsersResolver {
    constructor(private readonly usersService: UsersService){}

    @Query(() => Boolean)
    hi(){
        return true;
    }

    @Mutation(() =>CreateAccountOutput)
    async createAccout(@Args("input")createAccountInput: CreateAccountInput): Promise<CreateAccountOutput>{
        try{
            const{ok, error}= await this.usersService.createAccount(createAccountInput);
            return {ok, error};
        }catch(error){
            return{
                error,
                ok: false,
            };
        }
    }

    @Mutation(()=> LoginOutput)
        async login(@Args('input') loginInput: LoginInput){
            try{
                const{ok, error, token} = await this.usersService.login(loginInput)       ;
                return{ ok, error, token};
            }catch(error){
                return{
                    ok: false,
                    error,
                }
            }
        }

    @Query(()=> User)
    @UseGuards(AuthGuard)
    me(@AuthUser() authUser: User) {
        return authUser;
    }//

    @UseGuards(AuthGuard)
    @Query(() => UserProfileOutput)
   async userProfile(@Args() userProfileInput: UserProfileInput): Promise<UserProfileOutput>{
        try{
            const user = await this.usersService.findById(userProfileInput.userId);
            if (!user) {
                throw Error();
              }
              return {
                ok: true,
                user,
              }
        }catch(error){
            return{
                ok: false,
                error: "User Not Found",
            };
        }
    }

    @UseGuards(AuthGuard)
    @Mutation(()=> EditProfileOutput)
    async editProfile(@AuthUser() authUser: User, @Args('input') editProfileInput: EditProfileInput):Promise<EditProfileOutput>{
        try{
            await this.usersService.editProfile(authUser.id, editProfileInput);
            return{
                ok: true
            }
        }catch(error){
            return{
                ok: false,
                error
            }
        }
    }
}