import { ArgsType, Field, InputType, PartialType } from "@nestjs/graphql";
import { CreateStoreDto } from "./create-store.dto";


@InputType()
export class UpdateStoreInputDto extends PartialType(CreateStoreDto){}

@InputType()
export class UpdateStoreDto {

    @Field(type=> Number)
    id: number;

    @Field(() => UpdateStoreInputDto)
    data: UpdateStoreInputDto;
}