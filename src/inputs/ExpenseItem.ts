import { InputType, Field } from "type-graphql";

@InputType()
export class ExpenseItemInput {

    @Field()
    onDate: Date;

    @Field()
    isRecurring: Boolean;

    @Field()
    accessLevel: string;

    @Field({nullable:true})
    status: string;

    @Field({nullable:true})
    split1UserStatus: string;

    @Field({nullable:true})
    split2UserStatus: string;

    @Field({nullable:true})
    split1UserAmount: Number;

    @Field({nullable:true})
    split2UserAmount: Number;

    @Field({nullable:true})
    split1UserId: string;

    @Field({nullable:true})
    split2UserId: string;

    @Field()
    description: string;

    @Field({nullable:true})
    attachment: string;

    @Field({nullable:true})
    isPinned: Boolean;


}

