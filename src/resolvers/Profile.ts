import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import { Profile } from "../models";
import { ProfileInput } from "../inputs";
import { DeleteResult, Repository } from "typeorm";




@Resolver(of => Profile)
export class ProfileResolver {
  constructor() {

  }

  @Query(() => Profile, { nullable: true })
  async getProfile(@Arg("id", { nullable: true }) id: string) {
    let obj = await Profile.findOne(id);
    return obj;
  }

  @Mutation(() => Profile, { nullable: true })
  async createProfile(
    @Arg("data", () => ProfileInput, { nullable: true }) data: ProfileInput

  ): Promise<Profile> {
    let result = await Profile.create<Profile>(data).save();
    return result;
  }

  @Mutation(() => Profile, { nullable: true })
  async updateProfile(
    @Arg("data", () => ProfileInput, { nullable: true }) data: ProfileInput,
    @Arg("id", { nullable: true }) id: string

  ): Promise<Profile> {


    await Profile.update(id, Profile.create({ ...data }))
    const obj = await Profile.findOne({ where: { id }, }) || new Profile();

    return obj;
  }
}

