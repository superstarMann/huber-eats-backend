import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from 'src/stores/entities/store.entity';
import { Order } from './entities/order.entity';
import { OrderResolver } from './orders.resolver';
import { OrderService } from './orders.service';

@Module({
    imports: [TypeOrmModule.forFeature([Order, Store])],
    providers:[
        OrderService,
        OrderResolver
    ]
})
export class OrdersModule {}
