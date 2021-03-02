import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { StoreResolver } from './stores.resolvers';
import { StoreService } from './stores.service';


@Module({
    imports: [TypeOrmModule.forFeature([Store])],
    providers:[StoreResolver, StoreService]
})
export class StoresModule {}
