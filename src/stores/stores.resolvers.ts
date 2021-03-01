import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import { CreateStoreDto } from './dtos/create-store.dto';
import { Store } from './entities/store.entity';


@Resolver(()=> Store)
export class StoreResolver{
    @Query(()=> [Store])
    stores(@Args('veganOnly') veganOnly: boolean): Store[]{
        return[];
    }
    @Mutation(()=> Boolean)
    createStore(@Args() createStoreInputDto: CreateStoreDto):boolean{
        console.log(createStoreInputDto)
        return true;
    }
}
