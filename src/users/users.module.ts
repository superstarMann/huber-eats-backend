import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { UsersResolver } from './entities/users.resolver';
import { UsersService } from './entities/users.service';
import { Verification } from './entities/verification.entity';

@Module({
    imports: [TypeOrmModule.forFeature([User, Verification])],
    providers: [UsersResolver, UsersService],
    exports: [UsersService]
    })
export class UsersModule {}
