import { InputType, Field } from "type-graphql";

@InputType()
export class DiscusssionInput {

    @Field()
    title: string;

    @Field()
    onDate: Date;

    @Field()
    isUrgent: Boolean;

    @Field()
    accessLevel: string;

    @Field()
    status: string;


    @Field()
    description: string;

  
    @Field()
    isPinned: Boolean;
    @Field()
    subject: string;

    @Field()
    summary: string;

    
    @Field(() => Boolean, {nullable:true})
    isArchived: Boolean;

    @Field(() => Date, {nullable:true})
    lastMessageDate: Date;


}

