import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { CategoryRepository } from './repositories/category.repository';
import { CategoryResolver, StoreResolver } from './stores.resolvers';
import { StoreService } from './stores.service';


@Module({
    imports: [TypeOrmModule.forFeature([Store, CategoryRepository])],
    providers:[StoreResolver, StoreService, CategoryResolver]
})
export class StoresModule {}
