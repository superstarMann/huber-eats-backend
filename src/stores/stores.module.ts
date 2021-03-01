import { Module } from '@nestjs/common';
import { StoreResolver } from './stores.resolvers';


@Module({providers:[StoreResolver]})
export class StoresModule {}
