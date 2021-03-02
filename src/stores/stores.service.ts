import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Store } from "./entities/store.entity";

@Injectable()
export class StoreService{
    constructor(@InjectRepository(Store) private readonly stores: Repository<Store>,) {}
    getAll(): Promise <Store[]>{
        return this.stores.find();
    }
}