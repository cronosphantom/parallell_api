import { InputType, Field } from "type-graphql";

@InputType()
export class ExpenseInput {

    @Field()
    name: string;

    @Field()
    onDate: Date;

    @Field()
    dueDate: Date;

    @Field()
    isRecurring: Boolean;

    @Field()
    accessLevel: string;

    @Field()
    status: string;

    @Field()
    description: string;

    @Field()
    attachment: string;

    @Field()
    isPinned: Boolean;
}

