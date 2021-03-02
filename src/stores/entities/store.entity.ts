import { Field, Int, ObjectType } from "@nestjs/graphql";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@ObjectType()
@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    @Field(() => Number)
    id: number;

    @Field(() => String)
    @Column()
    name:string;

    @Field(()=> Boolean)
    @Column()
    isVegan:  boolean;

    @Field(()=> String)
    @Column()
    adress: string;
    
    @Field(()=> String)
    @Column()
    ownerName: string;

    @Field(() => Boolean)
    @Column()
    handsome: boolean
}