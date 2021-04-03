import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateStoreInput, CreateStoreOutput } from "./dtos/create-store.dto";
import { EditStoreInput, EditStoreOutput } from "./dtos/edit-store.dto";
import { Category } from "./entities/category.entity";
import { Store } from "./entities/store.entity";

@Injectable()
export class StoreService{
    constructor(
    @InjectRepository(Store) private readonly stores: Repository<Store>,
    @InjectRepository(Category) private readonly categories: Repository<Category>) {}


    async getOrCreateCategory(name: string): Promise<Category>{
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
            const category = await this.getOrCreateCategory(createStoreInput.categoryName);
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
        ///////////////////
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
   }