import { UseGuards } from '@nestjs/common';
import {Resolver, Query, Mutation, Args, Context} from '@nestjs/graphql';
import { AuthGuard } from 'src/auth/auth.guard';
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto';
import { LoginInput, LoginOutput } from '../dtos/login.dto';
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
    me() {}
}