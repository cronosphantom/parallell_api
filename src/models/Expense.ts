//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID, FieldResolver } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile, User, Child } from "./index";

//************     WE ARE NOT GOING TO  USE THIS  *****   */
@Entity()
@ObjectType()
export class Expense extends BaseEntity {
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
    @Column({nullable:false})
    onDate: Date;

    @Field()
    @Column({nullable:false})
    dueDate: Date;

    @Field()
    @Column({nullable:false})
    isRecurring: Boolean;

    @Field()
    @Column({nullable:false})
    accessLevel: string;

    @Field()
    @Column()
    status: string;

    @Field()
    @Column({nullable:false})
    description: string;

    @Field()
    @Column({nullable:false})
    attachment: string;

    @Field()
    @Column({nullable:false})
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