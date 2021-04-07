import { Injectable } from "@nestjs/common";
import { Args, Mutation } from "@nestjs/graphql";
import { InjectRepository } from "@nestjs/typeorm";
import { AuthUser } from "src/auth/auth-user.decorator";
import { Role } from "src/auth/role.decorator";
import { Store } from "src/stores/entities/store.entity";
import { User } from "src/users/entities/user.entity";
import { Repository } from "typeorm";
import { CreateOrderOutput, CreatOrderInput } from "./dtos/create-order.dto";
import { Order } from "./entities/order.entity";

@Injectable()
export class OrderService{
    constructor(
        @InjectRepository(Order)
        private readonly orders: Repository<Order>,
        @InjectRepository(Store)
        private readonly stores: Repository<Store>,
    ){}

    async createOrder(customer: User, {storeId, items}: CreatOrderInput): Promise<CreateOrderOutput>{
        try{

            const store = await this.stores.findOne(storeId);
            if(!store){
                return{
                    ok: false,
                    error: 'Store not Found'
                };
            }
            const order = await this.orders.save(this.orders.create({
                customer,
                store
            }))
            console.log(order)
        }catch(error){
            return{
                ok: false,
                error: 'Could not create Order'
                }
            }
        }
   
}