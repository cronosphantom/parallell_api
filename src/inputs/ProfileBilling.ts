import { InputType, Field } from "type-graphql";

@InputType()
export class ProfileBillingInput {

    @Field(() => String)
    profileId: string;
      
    @Field(() => String)
    name: string;
  
    @Field(() => String)
    planLevel: string;
  
    @Field(() => String)
    paymentAmount: string;

    @Field(() => String)
    lastPaymentDate: Date;

    @Field(() => String)
    nextPaymentAmount: string;

    @Field(() => String)
    nextPaymentDate: Date;

    @Field({nullable:true})
    expirationDate: string;

    @Field({nullable:true})
    status: string;

}

  