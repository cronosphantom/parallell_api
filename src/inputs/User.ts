import { InputType, Field } from "type-graphql";

@InputType()
export class UserInput {

    @Field(() => String)
    firstName: string;
      
    @Field(() => String)
    lastName: string;
  
    @Field(() => String)
    email: string;
  
    @Field(() => String)
    password: string;

    @Field({nullable:true})
    expirationDate: string;

    @Field({nullable:true})
    status: string;

}

