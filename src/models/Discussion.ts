//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID, FieldResolver } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile, User, Child } from "./index";


@Entity()
@ObjectType()
export class Discussion extends BaseEntity {
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
    title: string;

    @Field()
    @Column({nullable:false})
    onDate: Date;

    @Field()
    @Column({nullable:false})
    isUrgent: Boolean;

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
    isPinned: Boolean;
    @Field()
    @Column({nullable:false})
    subject: string;

    @Field()
    @Column({nullable:true})
    summary: string;

    
    @Field(() => Boolean, {nullable:true})
    @Column({type:"boolean",nullable:true})
    isArchived: Boolean;

    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    lastMessageDate: Date;

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


  // set relation with User table
  @Field(() => User,{nullable:true})
  @ManyToOne(() => User , user => user.id)
  createdBy: User

    
  //========== Relations ====================//

    @Field(() => [User])
    @OneToMany(() => User, user => user.id, {nullable: false, cascade: true, onDelete: 'CASCADE'})
    lastSeenUser: User[];

    // @Field(() => [Document])
    // @OneToMany(() => Document, document => document.id, {nullable: false, cascade: true, onDelete: 'CASCADE'})
    // messages : Document[];


}