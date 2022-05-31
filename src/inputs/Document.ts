import { InputType, Field } from "type-graphql";

@InputType()
export class Input {

    @Field()
    fileName: string;

    @Field()
    url: string;

    @Field()
    mediaType: string;


}

