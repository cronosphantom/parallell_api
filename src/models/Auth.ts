//Heart of the System - Everything is centered around a Profile

import { ObjectType, Field, } from "type-graphql";
import { User } from ".";

@ObjectType()
export class UserLogin {
        
    @Field()
    status: string;

    @Field()
    token: string;

    @Field()
    refreshToken: Date;
   
  // set relation with User table
  @Field(() => User,{nullable:true})
  user: User

}