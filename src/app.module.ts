import { Module } from '@nestjs/common';
import * as Joi from "joi";
import {GraphQLModule} from '@nestjs/graphql';
import { StoresModule } from './stores/stores.module';
import { TypeOrmModule} from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { CommonModule } from './common/common.module';
import { User } from './users/entities/user.entity';

console.log(Joi);

@Module({
  imports: [
  ConfigModule.forRoot({
    isGlobal: true,
    envFilePath: process.env.NODE_ENV === 'dev' ? '.env.dev' : '.env.test',
    ignoreEnvFile: process.env.NODE_ENV ==='prod',
    validationSchema: Joi.object({
      NODE_ENV: Joi.string().valid('dev', 'prod').required(),
      DB_HOST: Joi.string().required(),
      DB_PORT: Joi.string().required(),
      DB_USERNAME: Joi.string().required(),
      DB_PASSWORD: Joi.string().required(),
      DB_DATABASE: Joi.string().required(),
    })
  }),
  TypeOrmModule.forRoot({
    type: 'postgres',
    host:process.env.DB_HOST,
    port:+process.env.DB_PORT, //+붙이면 숫자로 바뀜 @제외
    username:process.env.DB_USERNAME,
    password:process.env.DB_PASSWORD,
    database:process.env.DB_DATABAS,
    synchronize: process.env.NODE_ENV !== 'prod',
    logging: process.env.NODE_ENV !== 'prod',
    entities: [User],
    }),
  GraphQLModule.forRoot({
    autoSchemaFile: true,
  }),
  UsersModule,
  CommonModule, 
],
  controllers: [],
  providers: [],
})
export class AppModule {

}
