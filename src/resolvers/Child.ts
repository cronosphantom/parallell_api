import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { DeleteResult } from "typeorm";
import { ChildInput } from "../inputs";
import { Child, Profile, ProfileUser } from "../models";

@Resolver((of) => Child)
export class ChildResolver {
  constructor() {}

  @Query(() => Child, { nullable: true })
  async child(@Arg("id", { nullable: true }) id: string) {
    let obj = await Child.findOne(id);
    return obj;
  }

  @Query(() => [Child])
  async children(@Arg("profileId", { nullable: false }) profileId: string) {
    const objs = await Child.find({ where: { profile: profileId } });
    return objs;
  }

  @Mutation(() => Child, { nullable: true })
  async createChild(
    @Arg("data", () => ChildInput, { nullable: true }) data: ChildInput
  ): Promise<Child> {
    let dataSrc: any = data;
    delete dataSrc.user
    
    const profileUser = await ProfileUser.findOne(data.user)
    const profile = await Profile.findOne(profileUser?.profile)
    let newObj = new Child();
    newObj.profile = profile || new Profile();
    Object.assign(newObj, dataSrc);

    await newObj.save()
    return newObj;
  }

  @Mutation(() => Child, { nullable: true })
  async updateChild(
    @Arg("data", () => ChildInput, { nullable: true }) data: ChildInput,
    @Arg("id", { nullable: true }) id: string
  ): Promise<Child> {
    await Child.update(id, Child.create({ ...data }));
    const obj = (await Child.findOne(id)) || new Child();
    return obj;
  }

  @Mutation(() => Child, { nullable: true })
  async deleteChild(@Arg("id", { nullable: true }) id: string): Promise<Child> {
    const obj = (await Child.findOne(id)) || new Child();
    const deleteResult: DeleteResult = await Child.delete({ id: id });
    return obj;
  }
}
