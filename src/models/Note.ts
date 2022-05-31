//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate, ManyToMany } from "typeorm";
import { ObjectType, Field, ID, FieldResolver } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile, User, Child } from "./index";


@Entity()
@ObjectType()
export class Note extends BaseEntity {
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
    accessLevel: string;

    @Field()
    @Column({nullable:true})
    description: string;

    @Field()
    @Column({nullable:true})
    attachment: string;

    @Field()
    @Column({nullable:true})
    isPinned: Boolean;

    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    updatedAt: Date;


    // set relation with Profile table
  @Field(() => Profile)
  @ManyToOne(() => Profile , profile => profile.id)
  profile: Profile

  @Field(()=>Child,{nullable:true})
  @ManyToOne(() => Child , child => child.id)
  child: Child;

  // set relation with User table
  @Field(() => User,{nullable:true})
  @ManyToOne(() => User , user => user.id)
  createdBy: User

}