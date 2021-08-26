import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { PaginationInput, PaginationOutput } from "src/common/dtos/pagination.dto";
import { Category } from "../entities/category.entity";
import { Store } from "../entities/store.entity";

@InputType()
export class CategoryInput extends PaginationInput {
    @Field(() => String)
    slug: string
}


@ObjectType()
export class CategoryOutput extends PaginationOutput{
    @Field(() => [Store], {nullable: true})
    stores?: Store[]
    @Field(() => Category, {nullable: true})
    category?: Category;
}