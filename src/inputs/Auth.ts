import { InputType, Field } from "type-graphql";
import { User } from "../models";


@InputType()
export class AuthPayload {

    @Field(() => String)
    status: string;
      
    @Field(() => String)
    token: string;
  
    @Field({nullable:true})
    user: string;

}

@InputType()
export class LoginInput {

    @Field(() => String)
    email: string;
      
    @Field(() => String)
    password: string;

}