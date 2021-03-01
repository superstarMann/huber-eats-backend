import { Module } from '@nestjs/common';
import {GraphQLModule} from '@nestjs/graphql';
import { StoresModule } from './stores/stores.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    ignoreEnvFile: process.env.NODE_ENV ==='prod',


  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT, //+붙이면 숫자로 바뀜 @제외
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABAS,
    synchronize: true,
    logging: true,
    }),
  GraphQLModule.forRoot({
    autoSchemaFile: true,
  }),
  StoresModule, 
],
  controllers: [],
  providers: [],
})
export class AppModule {

}
