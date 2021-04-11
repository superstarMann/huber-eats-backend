import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from 'src/stores/entities/dish.entity';
import { Store } from 'src/stores/entities/store.entity';
import { OrderItem } from './entities/order-item.entity';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Store, OrderItem, Dish])],
    providers:[
        OrderService,
        OrderResolver
    ]
})
export class OrdersModule {}
