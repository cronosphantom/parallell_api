//Heart of the System - Everything is centered around a Profile

import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID, Float } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { ProfileUser } from "./ProfileUser";
import { Profile } from "./Profile";
import { Child } from "./Child";
import { User } from "./User";


@Entity()
@ObjectType()
export class Document extends BaseEntity {
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
    fileName: string;

    @Field()
    @Column({nullable:true})
    url: string;

    @Field()
    @Column({nullable:true})
    mediaType: string;


    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    @Column({nullable:true})
    updatedAt: Date;



    
  //========== Relations ====================//

    @Field(() => [User])
    @OneToMany(() => User, user => user.id, {nullable: false, cascade: true, onDelete: 'CASCADE'})
    profile: User[];

  

}