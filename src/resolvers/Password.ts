import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import {  PasswordInput } from "../inputs";
import { DeleteResult } from "typeorm";
import { Password, Profile, ProfileUser } from "../models";



@Resolver(of => Password)
export class PasswordResolver {
  constructor( ) {

  }

  @Query(() => Password,{nullable:true})
  async password(@Arg("id",{nullable:true}) id: string) { 
    let obj =  await  Password.findOne(id);
    return obj;
  }


  @Query(() => [Password])
  async passwords(
    @Arg("profileId", { nullable: false }) profileId: string) {
   
    const objs = await Password.find({where: {profile: profileId}});
    return objs
  }


  @Mutation(() => Password,{nullable:true}) 
  async createPassword (
    @Arg("data", () => PasswordInput,{nullable:true}) data: PasswordInput
    ): Promise<Password> {
    const profileUser = await ProfileUser.findOne({where:{id: data.profileUserId}, relations:['profile'] }) || new ProfileUser()
    const profile = await Profile.findOne({where:{id: profileUser?.profile.id}}) || new Profile()

    let newObj = new Password();
    newObj.profile = profile;
    newObj.createdBy = profileUser;
    newObj.accessLevel = data.accessLevel;
    newObj.url = data.url;
    newObj.name = data.name;
    newObj.description = data.description;
    await newObj.save();

   
    return newObj;
  }
  
  @Mutation(() => Password,{nullable:true})
  async updatePassword (
    @Arg("data", () => PasswordInput,{nullable:true}) data: PasswordInput,
    @Arg("id",{nullable:true}) id: string
    
    ): Promise<Password> {
      
 
    await Password.update(id,Password.create({...data})) 
    const obj = await Password.findOne( {  where:{      id   },    }) || new Password();

    return obj;
  }

  @Mutation(() => Password,{nullable:true})
  async deletePassword(@Arg("id",{nullable:true}) id: string) : Promise<Password> {
    const obj = await Password.findOne({ where:{
      id
    },
     
     }) || new Password()
    const deleteResult: DeleteResult = await Password.delete({id: id});
    

    return obj
  }

 

}
