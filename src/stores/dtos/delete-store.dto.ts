import { Field, InputType, ObjectType } from "@nestjs/graphql";
import { CoreOutput } from "src/common/dtos/output.dto";

@InputType()
export class DeleteStoreInput{
    @Field(() => Number)
    storeId: number;
}

@ObjectType()
export class DeleteStoreOutput extends CoreOutput{
    
}