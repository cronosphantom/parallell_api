import { InputType, Field } from "type-graphql";

@InputType()
export class NoteInput {

      
    @Field(() => String)
    accessLevel: string;
  
    @Field(() => String, {nullable: true})
    description: string;

    @Field(() => String, {nullable: true})
    attachment: string;
  
    @Field(() => String, {nullable: true})
    isPinned: Boolean;

    @Field(() => String, {nullable: true})
    childId: string;

    @Field(() => String)
    profileUserId: string;
    

}

