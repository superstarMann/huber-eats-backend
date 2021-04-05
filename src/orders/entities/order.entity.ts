import { Field, Float, InputType, ObjectType, registerEnumType } from "@nestjs/graphql";
import { CoreEntity } from "src/common/entities/core.entity";
import { Dish } from "src/stores/entities/dish.entity";
import { Store } from "src/stores/entities/store.entity";
import { User } from "src/users/entities/user.entity";
import { Column, Entity, JoinTable, ManyToMany, ManyToOne } from "typeorm";

export enum OrderStatus{
    Pending = 'Pending', //대기
    Cooking = 'Cooking', //요리
    PickedUp = 'PickedUp', //받음
    Delivered = 'Delivered', // 배달
}

registerEnumType(OrderStatus, {name: 'OrderStatus'} )

@InputType('OrderType', {isAbstract: true})
@Entity()
@ObjectType()
export class Order extends CoreEntity{
    
    @Field(type => User, {nullable: true})
    @ManyToOne(type => User, user => user.orders, {onDelete: 'SET NULL', nullable: true})
    customer?: User

    @Field(() => User, {nullable: true})
    @ManyToOne(type => User, user => user.rides, {onDelete: 'SET NULL', nullable: true})
    driver?: User

    @Field(() => Store)
    @ManyToOne(type => Store, store => store.orders, {onDelete: 'SET NULL', nullable: true})
    store: Store

    @Field(() => [Dish])
    @ManyToMany(() => Dish)
    @JoinTable()
    dishes: Dish[]

    @Column()
    @Field(() => Float)
    total: number;

    @Column({type: "enum", enum: OrderStatus})
    @Field(() => OrderStatus)
    status: OrderStatus

}