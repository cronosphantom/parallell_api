//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { ProfileUser } from "./ProfileUser";
import { Child } from "./Child";


@Entity()
@ObjectType()
export class ProfileNote extends BaseEntity {
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
    description: string;

    @Field(() => Boolean, {nullable:true})
    @Column({type:"boolean",nullable:true})
    isPinned: Boolean;

    @Field()
    @Column({nullable:false})
    visibleTo: string;
    
    
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    updatedAt: Date;



    
  //========== Relations ====================//

    @Field(() => [ProfileUser])
    @OneToMany(() => ProfileUser, profileUser => profileUser.profile, {nullable: false, cascade: true, onDelete: 'CASCADE'})
    forChild: ProfileUser[];


    @Field(() => [Child])
    @OneToMany(() => Child, child => child.profile, {nullable: false, cascade: true, onDelete: 'CASCADE'})
    documents: Child[];

    @Field(() => [Child])
    @OneToMany(() => Child, child => child.profile, {nullable: false, cascade: true, onDelete: 'CASCADE'})
    profile: Child[];

    
    @Field(() => [Child])
    @OneToMany(() => Child, child => child.profile, {nullable: false, cascade: true, onDelete: 'CASCADE'})
    createdBy: Child[];
}