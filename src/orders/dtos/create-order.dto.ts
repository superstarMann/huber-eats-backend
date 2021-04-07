import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { OrderItemOption } from "../entities/order-item.entity";


@InputType()
class CreateOrderitemInput{

    @Field(() => Int)
    dishId: number;

    @Field(() => [OrderItemOption], {nullable: true})
    options?: OrderItemOption[];

}

@InputType()
export class CreatOrderInput {
    @Field(() => Int)
    storeId: number;

    @Field(() => [CreateOrderitemInput])
    items: CreateOrderitemInput[];
    
}

@ObjectType()
export class CreateOrderOutput extends CoreOutput{}