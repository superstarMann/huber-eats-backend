import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Dish } from './entities/dish.entity';
import { Store } from './entities/store.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryResolver, DishResolver, StoreResolver } from './stores.resolvers';
import { StoreService } from './stores.service';


@Module({
    imports: [TypeOrmModule.forFeature([Store, CategoryRepository, Dish])],
    providers:[StoreResolver, StoreService, CategoryResolver, DishResolver]
})
export class StoresModule {}
