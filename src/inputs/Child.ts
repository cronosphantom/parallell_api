import { InputType, Field } from "type-graphql";

@InputType()
export class ChildInput {

    @Field({nullable: true})
    title?: string;

    @Field()
    name: string;

    @Field({nullable: true})
    dob?: Date;
   
    @Field({nullable: true})
    email?: string;

    @Field({nullable: true})
    school?: string;

    @Field({nullable: true})
    teacher?: string;

    @Field({nullable: true})
    description?: string;

    @Field({nullable: true})
    favorites?: string;

    @Field({nullable: true})
    clothingSizes?: string;

    @Field({nullable: true})
    photo?: string;


    @Field({nullable:false})
    user: string;
}

