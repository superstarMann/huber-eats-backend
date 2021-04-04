import { Args, Int, Mutation, ResolveField, Resolver, Query, Parent } from '@nestjs/graphql'
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { AllCategoriesOutput } from './dtos/all-categories.dto';
import { CategoryInput, CategoryOutput } from './dtos/category.dto';
import { CreateStoreInput, CreateStoreOutput } from './dtos/create-store.dto';
import { DeleteStoreInput, DeleteStoreOutput } from './dtos/delete-store.dto';
import { EditStoreInput, EditStoreOutput } from './dtos/edit-store.dto';
import { StoresInput, StoresOutput } from './dtos/stores.dto';
import { StoreInput, StoreOutput } from './dtos/store.dto'
import { Category } from './entities/category.entity';
import { Store } from './entities/store.entity';
import { StoreService } from './stores.service';
import { SearchStoreInput, SearchStoreOutput } from './dtos/search-store.dto';
import { Dish } from './entities/dish.entity';
import { CreateDishInput, CreateDishOutput } from './dtos/create-dish.dto';


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
      @AuthUser() owner: User,
      @Args('input') editStoreInput: EditStoreInput,
    ): Promise<EditStoreOutput> {
      return this.storeService.editStore(owner, editStoreInput);
    }
    
    @Mutation(() => DeleteStoreOutput)
    @Role(['Owner'])
    deleteStore(
      @AuthUser() owner: User,
      @Args('input') deleteStoreInput: DeleteStoreInput,
      ): Promise<DeleteStoreOutput>{
        return this.storeService.deleteStore(owner, deleteStoreInput);
      }

      @Query(() => StoresOutput)
      stores(@Args('input') storesInput: StoresInput): Promise<StoresOutput>{
        return this.storeService.allstores(storesInput);
      }

      @Query(returns => StoreOutput)
      store(
        @Args('input') storeInput: StoreInput,
      ): Promise<StoreOutput> {
        return this.storeService.findStoreById(storeInput);
      }
    
      @Query(() => SearchStoreOutput)
      searchStore(@Args('input') searchStoreInput: SearchStoreInput): Promise<SearchStoreOutput>{
        return this.storeService.searchStoreByName(searchStoreInput)}
      
}
    
    @Resolver(of => Category)
    export class CategoryResolver {
      constructor(private readonly storeService:  StoreService) {}
    
      @ResolveField(type => Int)
       storeCount(@Parent() category: Category): Promise<number> {
        return this.storeService.countStores(category)
      }
    
      @Query(type => AllCategoriesOutput)
      allCategories(): Promise<AllCategoriesOutput> {
        return this.storeService.allCategories();
      }

      @Query(() => CategoryOutput)
      category(@Args('input') categoryInput: CategoryInput): Promise<CategoryOutput>{
       return this.storeService.findCategoryBySlug(categoryInput)
      }

 }
    
 @Resolver(() => Dish)
 export class DishResolver{
   constructor(private readonly storeService: StoreService){}

   @Mutation(() => CreateDishOutput)
   @Role(["Owner"])
   createDish(@AuthUser() owner: User, @Args('input') createDishInput: CreateDishInput): Promise<CreateDishOutput>{
     return this.storeService.createDish(owner, createDishInput)
   }

}