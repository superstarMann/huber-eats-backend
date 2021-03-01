import { Field, ObjectType } from "@nestjs/graphql";

@ObjectType()
export class Store {
    @Field(() => String)
    name:string;

    @Field(()=> Boolean)
    isVegan:  boolean;

    @Field(()=> String)
    adress: string;
    
    @Field(()=> String)
    ownerName: string;
}