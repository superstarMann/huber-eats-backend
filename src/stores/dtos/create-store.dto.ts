import { Field, ArgsType } from "@nestjs/graphql";
import { IsBoolean, IsString, Length } from "class-validator";

@ArgsType()
export class CreateStoreDto{
    @Field(() => String)
    @IsString()
    @Length(5, 10)
    name:string;
    
    @Field(()=> Boolean, {nullable: true})
    @IsBoolean()
    isVegan:  boolean;

    @Field(()=> String)
    @IsString()
    adress: string;
    
    @Field(()=> String)
    @IsString()
    @Length(5, 10)
    ownerName: string;
}

