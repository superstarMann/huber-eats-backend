import { Field, InputType, ObjectType, PickType, Int } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";
import { Store } from "../entities/store.entity";

@InputType()
export class CreateStoreInput extends  PickType(Store, ['name', 'coverImg', 'address']) {
    
    @Field(() => String)
    categoryName: string;
    
}


@ObjectType()
export class CreateStoreOutput extends CoreOutput {
    @Field(type => Int)
    storeId? : number;
} 