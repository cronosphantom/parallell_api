//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { Profile } from "./Profile";
import { User } from "./User";


@Entity()
@ObjectType()
export class ProfileUser extends BaseEntity {
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
    role: string;

    @Field()
    @Column({nullable:true})
    status: string;

    @Field()
    @Column({nullable: true})
    inviteCode: string;
 
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    updatedAt: Date;



     //========== Relations ====================//



     @Field(() => Profile,{nullable:true})
     @ManyToOne(() => Profile , p => p.id)
     profile: Profile

     @Field(() => User,{nullable:true})
     @ManyToOne(() => User , user => user.id)
     user: User

    

}