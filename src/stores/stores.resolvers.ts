import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import { CreateStoreDto } from './dtos/create-store.dto';
import { Store } from './entities/store.entity';
import { StoreService } from './stores.service';


@Resolver(()=> Store)
export class StoreResolver{
    constructor(private readonly StoreService: StoreService) {}
    @Query(()=> [Store])
    stores(): Promise<Store[]>{
        return this.StoreService.getAll();
    }
    @Mutation(()=> Boolean)
    createStore(@Args() createStoreInputDto: CreateStoreDto):boolean{
                return true;
    }
}
