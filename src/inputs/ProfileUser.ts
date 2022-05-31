import { InputType, Field } from "type-graphql";

@InputType()
export class ProfileUserInput {

    @Field(() => String)
    role: string;
 
  
    @Field(() => String)
    profileId: string;
  

    @Field({nullable:true})
    email: string;

    @Field({nullable:true})
    phone: string;

    @Field({nullable:true})
    name: string;

    

    

}

