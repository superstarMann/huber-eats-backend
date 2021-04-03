import { SetMetadata } from '@nestjs/common';
import {Args, Mutation, Resolver} from '@nestjs/graphql'
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import { EditStoreInput, EditStoreOutput } from './dtos/edit-store.dto';
import { Store } from './entities/store.entity';
import { StoreService } from './stores.service';


@Resolver(()=> Store)
export class StoreResolver{
    constructor(private readonly storeService: StoreService) {}
    
    @Mutation(returns => CreateStoreOutput)
    @Role(['Owner'])
    async createStore(
      @AuthUser() authUser: User,
      @Args('input') createStoreInput: CreateStoreInput,
    ): Promise<CreateStoreOutput> {
      return this.storeService.createStore(authUser,createStoreInput);
    }

    @Mutation(returns => EditStoreOutput)
    @Role(['Owner'])
    editStore(
      @AuthUser() authUser: User,
      @Args('input') editStoreInput: EditStoreInput,
    ): EditStoreOutput {
      return { ok: true };
    }
  }