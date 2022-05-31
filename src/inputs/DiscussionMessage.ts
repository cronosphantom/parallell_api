import { InputType, Field } from "type-graphql";

@InputType()
export class DiscussionMessageInput {

    @Field()
    onDate: Date;

   
    @Field()
    toStatus: string;

    @Field()
    toUserId: string;

   
    @Field()
    message: string;

    @Field()
    attachment: string;

}

