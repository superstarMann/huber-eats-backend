import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { AuthUser } from 'src/auth/auth-user.decorator';
import { Role } from 'src/auth/role.decorator';
import { User } from 'src/users/entities/user.entity';
import { CreateOrderOutput, CreatOrderInput } from './dtos/create-order.dto';
import { Order } from "./entities/order.entity";
import { OrderService } from './orders.service';

@Resolver(() =>Order)
export class OrderResolver {
    constructor(
        private readonly ordersService: OrderService){}

        @Mutation(() => CreateOrderOutput)
        @Role(['Client'])
        async createOrder(
            @AuthUser() customer: User,
            @Args('input')
            createOrderInput: CreatOrderInput): Promise<CreateOrderOutput>{
            return this.ordersService.createOrder(customer, createOrderInput)
        }
}