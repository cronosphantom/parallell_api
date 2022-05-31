import { InputType, Field } from "type-graphql";

@InputType()
export class CalendarItemInput {

    @Field()
    name: string;

    @Field()
    onDate: Date;

    @Field()
    isRecurring: Boolean;

    @Field()
    accessLevel: string;

    @Field()
    status: string;

    @Field()
    rideInformation: string;

    @Field()
    location: string;


    @Field()
    description: string;

    @Field()
    attachment: string;

    @Field()
    isPinned: Boolean;
}

