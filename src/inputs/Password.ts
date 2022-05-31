import { InputType, Field } from "type-graphql";

@InputType()
export class PasswordInput {

    @Field(() => String)
    name: string;

    @Field(() => String, {nullable: true})
    url: string;
      
    @Field(() => String)
    accessLevel: string;
  
    @Field(() => String, {nullable: true})
    description: string;
  
    @Field(() => String)
    profileUserId: string;

}

