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
import { DeleteDishInput, DeleteDishOutput } from './dtos/delete-dish.dto';
import { EditDishInput, EditDishOutput } from './dtos/edit-dish.dto';
import { MyStoresOutput } from './dtos/my-stores.dto';
import { MyStoreInput, MyStoreOutput } from './dtos/my-store.dto';


@Resolver(of => Store)
export class StoreResolver {
  constructor(private readonly storeService: StoreService) {}

  @Mutation(returns => CreateStoreOutput)
  @Role(['Owner'])
  async createStore(
    @AuthUser() authUser: User,
    @Args('input') createStoreInput: CreateStoreInput,
  ): Promise<CreateStoreOutput> {
    return this.storeService.createStore(
      authUser,
      createStoreInput,
    );
  }

  @Query(returns => MyStoresOutput)
  @Role(['Owner'])
  myStores(@AuthUser() owner: User) : Promise<MyStoresOutput> {
    return this.storeService.myStores(owner);
  }

  @Query(returns => MyStoreOutput)
  @Role(['Owner'])
  myStore(
    @AuthUser() owner: User,
    @Args('input') myStoreInput : MyStoreInput
  ): Promise<MyStoreOutput>{
    return this.storeService.myStore(owner, myStoreInput);
  }

  @Mutation(returns => EditStoreOutput)
  @Role(['Owner'])
  editStore(
    @AuthUser() owner: User,
    @Args('input') editStoreInput: EditStoreInput,
  ): Promise<EditStoreOutput> {
    return this.storeService.editStore(owner, editStoreInput);
  }

  @Mutation(returns => DeleteStoreOutput)
  @Role(['Owner'])
  deleteStore(
    @AuthUser() owner: User,
    @Args('input') deleteStoreInput: DeleteStoreInput,
  ): Promise<DeleteStoreOutput> {
    return this.storeService.deleteStore(
      owner,
      deleteStoreInput,
    );
  }

  @Query(returns => StoresOutput)
  stores(
    @Args('input') storesInput: StoresInput,
  ): Promise<StoresOutput> {
    return this.storeService.allstores(storesInput);
  }

  @Query(returns => StoreOutput)
  store(
    @Args('input') storeInput: StoreInput,
  ): Promise<StoreOutput> {
    return this.storeService.findStoreById(storeInput);
  }

  @Query(returns => SearchStoreOutput)
  searchStore(
    @Args('input') searchStoreInput: SearchStoreInput,
  ): Promise<SearchStoreOutput> {
    return this.storeService.searchStoreByName(searchStoreInput);
  }
}

@Resolver(of => Category)
export class CategoryResolver {
  constructor(private readonly storeService: StoreService) {}

  @ResolveField(type => Int)
  storeCount(@Parent() category: Category): Promise<number> {
    return this.storeService.countStores(category);
  }

  @Query(type => AllCategoriesOutput)
  allCategories(): Promise<AllCategoriesOutput> {
    return this.storeService.allCategories();
  }

  @Query(type => CategoryOutput)
  category(
    @Args('input') categoryInput: CategoryInput,
  ): Promise<CategoryOutput> {
    return this.storeService.findCategoryBySlug(categoryInput);
  }
}

@Resolver(of => Dish)
export class DishResolver {
  constructor(private readonly storeService: StoreService) {}

  @Mutation(type => CreateDishOutput)
  @Role(['Owner'])
  createDish(
    @AuthUser() owner: User,
    @Args('input') createDishInput: CreateDishInput,
  ): Promise<CreateDishOutput> {
    return this.storeService.createDish(owner, createDishInput);
  }

  @Mutation(type => EditDishOutput)
  @Role(['Owner'])
  editDish(
    @AuthUser() owner: User,
    @Args('input') editDishInput: EditDishInput,
  ): Promise<EditDishOutput> {
    return this.storeService.editDish(owner, editDishInput);
  }

  @Mutation(type => DeleteDishOutput)
  @Role(['Owner'])
  deleteDish(
    @AuthUser() owner: User,
    @Args('input') deleteDishInput: DeleteDishInput,
  ): Promise<DeleteDishOutput> {
    return this.storeService.deleteDish(owner, deleteDishInput);
  }
}