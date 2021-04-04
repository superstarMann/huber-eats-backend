import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.dto";
import { Store } from "../entities/store.entity";

@InputType()
export class StoresInput extends PaginationInput{}

@ObjectType()
export class StoresOutput extends PaginationOutput{
    @Field(() => [Store], {nullable: true})
    results?: Store[]
}