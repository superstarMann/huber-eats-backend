import {Resolver, Query, Mutation, Args} from '@nestjs/graphql';
import { CreateAccountInput, CreateAccountOutput } from '../dtos/create-account.dto';
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
            const {ok, error} = await this.usersService.createAccount(createAccountInput);            
            return {
                ok,
                error,
            };
        }catch(error){
            return{
                error,
                ok: false,
            };
        }
    }
}