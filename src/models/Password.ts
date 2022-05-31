//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID, FieldResolver } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile, User, Child } from "./index";
import { ProfileUser } from "./ProfileUser";


@Entity()
@ObjectType()
export class Password extends BaseEntity {
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
    @Column()
    name: string;

    @Field()
    @Column({nullable:true})
    url: string;


    @Field()
    @Column({nullable:false})
    accessLevel: string;

    @Field()
    @Column({nullable:true})
    description: string;


    @Field(() => Date, {nullable:false})
    @Column({nullable:false})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    updatedAt: Date;


    // set relation with Profile table
  @Field(() => Profile)
  @ManyToOne(() => Profile , profile => profile.id)
  profile: Profile


  // set relation with User table
  @Field(() => ProfileUser,{nullable:true})
  @ManyToOne(() => ProfileUser , user => user.id)
  createdBy: ProfileUser

}