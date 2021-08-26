import { Field, InputType, ObjectType } from '@nestjs/graphql';
import { IsString, Length } from 'class-validator';
import { CoreEntity } from 'src/common/entities/core.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { Store } from './store.entity';

@InputType('CategoryInputType',{ isAbstract: true })
@ObjectType()
@Entity()
export class Category extends CoreEntity {
  @Field(type => String)
  @Column({unique: true})
  @IsString()
  @Length(5)
  name: string;

  @Field(type => String, {nullable: true})
  @Column({nullable: true})
  @IsString()
  coverImg: string;

  @Field(type => String, {nullable: true})
  @Column({nullable: true})
  @IsString()
  bgImg: string;

  @Field(() => String)
  @Column({unique: true})
  @IsString()
  slug: string

  @Field(type => [Store])
  @OneToMany(
    type => Store,
    store => store.category,
  )
  stores : Store[]
}