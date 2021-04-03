import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { AllCategoriesOutput } from "./dtos/all-categories.dto";
import { CreateStoreInput, CreateStoreOutput } from "./dtos/create-store.dto";
import { DeleteStoreInput, DeleteStoreOutput } from "./dtos/delete-store.dto";
import { EditStoreInput, EditStoreOutput } from "./dtos/edit-store.dto";
import { Category } from "./entities/category.entity";
import { Store } from "./entities/store.entity";
import { CategoryRepository } from "./repositories/category.repository";

@Injectable()
export class StoreService{
    constructor(
    @InjectRepository(Store) private readonly stores: Repository<Store>,
    private readonly categories: CategoryRepository) {}


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
    }