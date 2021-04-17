import { Field, InputType, Int, ObjectType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Store } from "src/stores/entities/store.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, ManyToOne, RelationId } from "typeorm";

@InputType('PaymentInputType', { isAbstract: true })
@ObjectType()
@Entity()
export class Payment extends CoreEntity{

    @Field(type => String)
    @Column()
    transactionId: string;
  
    @Field(type => User)
    @ManyToOne(
      type => User,
      user => user.payments,
    )
    user: User;

    @Field(type => Store)
    @ManyToOne(type => Store)
    store: Store;
  
    @RelationId((payment: Payment) => payment.user)
    userId: number;
    
    @Field(() => Int)
    @RelationId((payment: Payment) => payment.store)
    storeId: number;

}