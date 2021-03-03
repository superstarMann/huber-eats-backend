import {Args, Mutation, Query, Resolver} from '@nestjs/graphql'
import { number } from 'joi';
import { CreateStoreDto } from './dtos/create-store.dto';
import { UpdateStoreDto } from './dtos/update-store.dto';
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
    async createStore(@Args('input') createStoreDto: CreateStoreDto):Promise<boolean>{
        console.log(createStoreDto)
        try{
            await this.StoreService.createStore(createStoreDto);
            return true;
        }catch(e){
            console.log(e)
            return false;
        }
    }
    
    @Mutation(() => Boolean)
    async updateStore(@Args('input') updateStoreDto: UpdateStoreDto):Promise<boolean>{
        try{
            await this.StoreService.updateStore(updateStoreDto);
            return true;
        }catch(e){
            console.log(e)
            return false;
        }
    }
}