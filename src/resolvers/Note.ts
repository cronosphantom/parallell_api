import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import { NoteInput } from "../inputs";
import { DeleteResult, Repository } from "typeorm";
import { Note, Profile, ProfileUser, Child } from "../models";



@Resolver(of => Note)
export class NoteResolver {
  constructor() {

  }

  @Query(() => Note,{nullable:true})
  async note(@Arg("id",{nullable:true}) id: string) { 
    let obj =  await  Note.findOne(id,{relations:['child']});
    return obj;
  }


  @Query(() => [Note])
  async notes(
    @Arg("profileId", { nullable: false }) profileId: string) {

    const objs = await Note.find({ where: { profile: profileId } });
    return objs
  }


  @Mutation(() => Note, { nullable: true })
  async createNote(
    @Arg("data", () => NoteInput, { nullable: true }) data: NoteInput

  ): Promise<Note> {
    let dataSrc: any = data;
    delete dataSrc.profileUserId
    delete dataSrc.childId
    //Check to Make accessLevel is all || parent || self 
    // if accessLevel == self  then  accessLevel = profileUserId        where accessLevel = all or accessLevel = role  or accessLevel = profileUserId
    const profileUser = await ProfileUser.findOne(data.profileUserId)
    const child = await Child.findOne(data.childId)
    const profile = await Profile.findOne(profileUser?.profile)
    let newObj = new Note();
    newObj.profile = profile || new Profile();
    if (child) {
      newObj.child = child;
    }
    Object.assign(newObj, dataSrc);

    await newObj.save()
    return newObj;
  }

  @Mutation(() => Note, { nullable: true })
  async updateNote(
    @Arg("data", () => NoteInput, { nullable: true }) data: NoteInput,
    @Arg("id", { nullable: true }) id: string

  ): Promise<Note> {


    await Note.update(id, Note.create({ ...data }))
    const obj = await Note.findOne({ where: { id }, }) || new Note();

    return obj;
  }

  @Mutation(() => Note, { nullable: true })
  async deleteNote(@Arg("id", { nullable: true }) id: string): Promise<Note> {
    const obj = await Note.findOne({
      where: {
        id
      },

    }) || new Note()
    const deleteResult: DeleteResult = await Note.delete({ id: id });


    return obj
  }



}
