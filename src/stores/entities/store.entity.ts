import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { IsString, Length } from "class-validator";
import { CoreEntity } from "src/common/entities/core.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId} from "typeorm";
import { Category } from "./category.entity";


@InputType('StoreInputType',{isAbstract: true})
@ObjectType()
@Entity()
export class Store extends CoreEntity {

    @Field(() => String)
    @Column()
    @IsString()
    @Length(10)
    name:string;

    @Field(type => String)
    @Column()
    @IsString()
    coverImg: string;
    
    @Field(()=> String)
    @Column()
    @IsString()
    adress: string;

    @Field(type => Category, {nullable: true})
    @ManyToOne(type => Category,category => category.stores, {nullable: true, onDelete:'SET NULL'})
    category: Category;

    @Field(type => User)
    @ManyToOne(type => User, user => user.stores, {onDelete: 'CASCADE'})
    owner: User;

    @RelationId((store: Store) => store.owner)
    ownerId: number;

}