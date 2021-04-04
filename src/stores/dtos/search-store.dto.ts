import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.dto";
import { Store } from "../entities/store.entity";

@InputType()
export class SearchStoreInput extends PaginationInput{
    @Field(() => String)
    query:string
}

@ObjectType()
export class SearchStoreOutput extends PaginationOutput{
    @Field(() => [Store], {nullable: true})
    stores?: Store[]
}