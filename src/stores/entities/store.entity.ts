import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { IsBoolean, IsOptional, IsString, Length } from "class-validator";
import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";


@InputType({isAbstract: true})
@ObjectType()
@Entity()
export class Store {

    @PrimaryGeneratedColumn()
    @Field(() => Number)
    id: number;

    @Field(() => String)
    @Column()
    @IsString()
    @Length(3)
    name:string;

    @Field(()=> Boolean, {defaultValue: false})
    @Column({default: false})
    @IsOptional()
    @IsBoolean()
    isVegan:  boolean;

    @Field(()=> String)
    @Column()
    @IsString()
    adress: string;
    
    @Field(()=> String)
    @Column()
    @IsString()
    @Length(3)
    ownerName: string;

    @Field(() => Boolean)
    @Column()
    @IsBoolean()
    handsome: boolean
}