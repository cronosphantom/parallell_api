//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID, FieldResolver } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile, ProfileUser } from "./index";
import { Child } from "./Child";


@Entity()
@ObjectType()
export class ChildGifts extends BaseEntity {
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
    @Column({nullable:true})
    url: string;

    @Field()
    @Column({nullable:true})
    name: string;
   
    @Field()
    @Column({nullable:false})
    status: string;

    //status =  planning  || purchased

    @Field()
    @Column({nullable:false})
    description: string;

    
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
  @Field(() => Child,{nullable:true})
  @ManyToOne(() => Child , c => c.id)
  child: Child

  // set relation with User table
  @Field(() => ProfileUser,{nullable:true})
  @ManyToOne(() => ProfileUser , user => user.id)
  assignedTo: ProfileUser

}