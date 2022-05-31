//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile } from ".";


@Entity()
@ObjectType()
export class AddressBook extends BaseEntity {
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
    firstName: string;

    @Field()
    @Column({nullable:true})
    lastName: string;

    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    dob: Date;

    @Field()
    @Column({nullable:true})
    relation: string;

    @Field()
    @Column({nullable:true})
    email: string;

    @Field()
    @Column({nullable:true})
    phone: string;

    @Field()
    @Column({nullable:true})
    description: string;

    @Field(() => Boolean, {nullable:true})
    @Column({type:"boolean",nullable:true})
    isUser: Boolean;
    
    
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    updatedAt: Date;



    
  //========== Relations ====================//

    @Field(() => [Profile])
    @OneToMany(() => Profile, profile => profile.children, {nullable: false})
    profile: Profile[];

    @Field(() => [Profile])
    @OneToMany(() => Profile, profile => profile.children, {nullable: false})
    createdBy: Profile[];


}