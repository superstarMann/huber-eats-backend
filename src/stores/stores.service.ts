import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Like, Raw, Repository } from "typeorm";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { CategoryInput, CategoryOutput } from "./dtos/category.dto";
import { CreateDishInput, CreateDishOutput } from "./dtos/create-dish.dto";
import { CreateStoreInput, CreateStoreOutput } from "./dtos/create-store.dto";
import { DeleteDishInput, DeleteDishOutput } from "./dtos/delete-dish.dto";
import { DeleteStoreInput, DeleteStoreOutput } from "./dtos/delete-store.dto";
import { EditDishInput, EditDishOutput } from "./dtos/edit-dish.dto";
import { EditStoreInput, EditStoreOutput } from "./dtos/edit-store.dto";
import { SearchStoreInput, SearchStoreOutput } from "./dtos/search-store.dto";
import { StoreInput, StoreOutput } from "./dtos/store.dto";
import { StoresInput, StoresOutput } from "./dtos/stores.dto";
import { Category } from "./entities/category.entity";
import { Dish } from "./entities/dish.entity";
import { Store } from "./entities/store.entity";
import { CategoryRepository } from "./repositories/category.repository";

@Injectable()
export class StoreService{
    constructor(
    @InjectRepository(Store) 
    private readonly stores: Repository<Store>,
    @InjectRepository(Dish)
    private readonly dishes: Repository<Dish>,
    private readonly categories: CategoryRepository,
    ) {}


    async getOrCreate(name: string): Promise<Category>{
        const categoryName = name.trim().toLowerCase();
            const categorySlug = categoryName.replace(/ /g, '-');
            let category = await this.categories.findOne({slug: categorySlug});
            if(!category){
                category = await this.categories.save(this.categories.create({slug: categorySlug, name: categoryName}))
            }
            return category;
    }
    
  async createStore(
      owner:User, 
      createStoreInput: CreateStoreInput
      ): Promise<CreateStoreOutput> {
        try{
            const newStore = this.stores.create(createStoreInput);
            newStore.owner = owner;
            const category = await this.categories.getOrCreate(createStoreInput.categoryName);
            newStore.category = category;
            await this.stores.save(newStore);
            return{
                ok: true,
            };
        }catch(error){
            return{
                ok: false,
                error: "Could not create store"
            }            
        }
    }
    
    async editStore(owner: User, editStoreInput: EditStoreInput): Promise<EditStoreOutput> {
        try{
        const store = await this.stores.findOne(editStoreInput.storeId);
        if(!store){
            return{
                ok: false,
                error: "Store Not Found"
            };
        }
        if(owner.id !== store.ownerId){
            return{
                ok: false,
                error: "You can't edit a store that you don't own",
            };
        }
        let category: Category = null;
        if(editStoreInput.categoryName){
            category = await this.categories.getOrCreate(editStoreInput.categoryName);
        }
        await this.stores.save([{
            id: editStoreInput.storeId,
            ...editStoreInput,
            ...(category && {category})
        }]);
            return{
                ok: true
            }   
        }catch{
            return{
                ok: false,
                error: "Could not edit Store"
            }
        }
    }

   async deleteStore(owner: User, {storeId}: DeleteStoreInput): Promise<DeleteStoreOutput>{
        try{
            const store = await this.stores.findOne(storeId);
        if(!store){
            return{
                ok: false,
                error: "Store Not Found"
            };
        }
        if(owner.id !== store.ownerId){
            return{
                ok: false,
                error: "You can't edit a store that you don't own",
            };
        }console.log('will delete', store)
        await this.stores.delete(storeId)
        return{
            ok: true
        };
        }catch(error){
            return{
                ok: false,
                error: "Can't delete Store"
            }
         }
      }

      async allCategories(): Promise<AllCategoriesOutput> {
        try {
          const categories = await this.categories.find();
          return {
            ok: true,
            categories,
          };
        } catch {
          return {
            ok: false,
            error: 'Could not load categories',
          };
        }
      }

      countStores(category: Category){
          return this.stores.count({category});
      }

      async findCategoryBySlug({slug, page}: CategoryInput): Promise<CategoryOutput>{
          try{
              const category = await this.categories.findOne({slug}, {relations: ['stores']});
              if(!category){
                  return{
                      ok:false,
                      error: "Category not found",
                  };
                }
                const stores = await this.stores.find({where: {category}, take: 25, skip: (page - 1)*25, });
                category.stores = stores;
                const totalResults = await this.countStores(category)
                return{
                        ok: true,
                        category,
                        totalPages: Math.ceil(totalResults / 25)
                }
          }catch(error){
              return{
                  ok: false,
                  error: "Could not load category"
              }
          }
      }

      async allstores({page} : StoresInput): Promise<StoresOutput>{
          try{
              const [results, totalResults] = await this.stores.findAndCount({skip:(page - 1 )*25 , take: 25});
              return{
                  ok:true,
                  results,
                  totalPages: Math.ceil(totalResults / 25),
                                 
              };
          }catch{
              return{
                  ok:false,
                  error: 'Could not load Stores'
              }
          }
      }


      async findStoreById({
        storeId,
      }: StoreInput): Promise<StoreOutput> {
        try {
          const store = await this.stores.findOne(storeId, {relations: ['menu']});
          if (!Store) {
            return {
              ok: false,
              error: 'Store not found',
            };
          }
          return {
            ok: true,
            store,
          };
        } catch {
          return {
            ok: false,
            error: 'Could not find Store',
          };
        }
      }

      async searchStoreByName({query, page}: SearchStoreInput): Promise<SearchStoreOutput>{
          try{
              const [stores, totalResults]  = await this.stores.findAndCount({
                  where: {
                    name: Raw(name => `${name} ILIKE '%${query}%'`),
                  },
                  take: 25, 
                  skip: (page - 1) *25
              });
              return{
                  ok:true,
                  stores,
                  totalResults,
                  totalPages: Math.ceil(totalResults / 25),
              }
          }catch(error){
              return{
                  ok:false,
                  error:'Could not search for stores'
              }
          }
      }

      async createDish(
        owner: User,
        createDishInput: CreateDishInput,
      ): Promise<CreateDishOutput> {
        try {
          const store = await this.stores.findOne(
            createDishInput.storeId,
          );
          if (!store) {
            return {
              ok: false,
              error: 'Store not found',
            };
          }
          if (owner.id !== store.ownerId) {
            return {
              ok: false,
              error: "You can't do that.",
            };
          }
          await this.dishes.save(
            this.dishes.create({ ...createDishInput, store }),
          );
          return {
            ok: true,
          };
        } catch (error) {
          console.log(error);
          return {
            ok: false,
            error: 'Could not create dish',
          };
        }
      }

      async editDish(owner: User, editDishInput: EditDishInput):Promise<EditDishOutput>{
        try{
          const dish = await this.dishes.findOne(editDishInput.dishId, {relations: ['store']})
          if(!dish){
            return{
              ok: false,
              error: 'Dish not found'
            }
          }
          if(dish.store.ownerId !== owner.id){
            return{
              ok: false,
              error: "You can't do that"
            };
          }
          await this.dishes.save([{
            id: editDishInput.dishId,
            ...editDishInput
          }])
          return{
            ok: true
          }
        }catch(error){
          return{
            ok: false,
            error: 'Could not edit dish'
          };
        }
      }

      async deleteDish(owner: User, {dishId}: DeleteDishInput):Promise<DeleteDishOutput>{
        try{
          const dish = await this.dishes.findOne(dishId, {relations: ['store']})
        if(!dish){
          return{
            ok: false,
            error: 'Dish not found'
          }
        };
        if(dish.store.ownerId !== owner.id){
          return{
            ok: false,
            error: "You can't do that"
          };
        }
        await this.dishes.delete(dishId)
        return{
          ok: true
        }
        }catch(error){
          return{
            ok: false,
            error: 'Could not delete dish'
          };
        }
      }
    }