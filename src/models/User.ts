
import { Entity, BaseEntity, PrimaryGeneratedColumn, Column, ManyToOne, OneToOne, OneToMany, PrimaryColumn, BeforeInsert, BeforeUpdate } from "typeorm";
import { ObjectType, Field, ID } from "type-graphql";
import { IdGenerator } from "../utils/idGenerator";
import { ProfileUser, Profile } from "./index";


@Entity()
@ObjectType()
export class User extends BaseEntity {
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
  updateUpdatedAt() {
    this.updatedAt = new Date()
  }
  @Field()
  @Column({ nullable: false })
  password: string;

  @Field()
  @Column({ nullable: false })
  email: string;

  @Field()
  @Column({ nullable: false })
  firstName: string;

  @Field({ nullable: true })
  @Column({ nullable: true })
  lastName: string;


  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  @Column({ nullable: true })
  updatedAt: Date;



  // set relation with Profile table
  @Field(() => [ProfileUser], { nullable: true })
  @OneToMany(() => ProfileUser, a => a.user)
  profiles: ProfileUser[]

  @Field(() => [Profile], { nullable: true })
  @OneToMany(() => Profile, profile => profile.id)
  access: Profile[]

}