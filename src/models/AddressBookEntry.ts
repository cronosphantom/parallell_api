//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID, FieldResolver } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile, User } from "./index";


@Entity()
@ObjectType()
export class AddressBookEntry extends BaseEntity {
    @Field(() => ID)
    @PrimaryColumn("varchar", {
      length: 25
    })
    id: string;

    @BeforeInsert()
    setId() {
      
      this.id = new IdGenerator().generate();
      this.createdAt = new Date()
      this.updatedAt = new Date()
    }

    @BeforeUpdate()
    updateUpdatedAt(){
      this.updatedAt = new Date()
    }


    @Field()
    @Column({nullable:false})
    title: string;

    @Field()
    @Column()
    name: string;

    @Field()
    @Column({nullable:false})
    mobile: string;
   
    @Field()
    @Column({nullable:false})
    email: string;

    @Field()
    @Column({nullable:false})
    description: string;

    @Field()
    @Column({nullable:false})
    photo: string;

    

    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    updatedAt: Date;


    // set relation with Profile table
  @Field(() => Profile,{nullable:true})
  @ManyToOne(() => Profile , profile => profile.id)
  profile: Profile

  // set relation with User table
  @Field(() => User,{nullable:true})
  @ManyToOne(() => User , user => user.id)
  createdBy: User

}