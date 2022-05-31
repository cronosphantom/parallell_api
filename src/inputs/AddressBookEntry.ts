import { InputType, Field } from "type-graphql";

@InputType()
export class AddressBookEntryInput {

    @Field({nullable:false})
    title: string;

    @Field()
    name: string;

    @Field({nullable:false})
    mobile: string;
   
    @Field({nullable:false})
    email: string;

    @Field({nullable:false})
    description: string;

    @Field({nullable:false})
    photo: string;

    @Field({nullable:false})
    profile: string;

    @Field(() => Date, {nullable:true})
    createdAt: Date;
  
    @Field(() => Date, {nullable:true})
    updatedAt: Date;
}

