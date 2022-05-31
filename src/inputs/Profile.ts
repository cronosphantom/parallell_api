import { InputType, Field } from "type-graphql";

@InputType()
export class ProfileInput {

    @Field(() => String)
    name: string;
      
    @Field(() => String)
    description: string;
  
    @Field(() => String)
    userId: string;

     
}

