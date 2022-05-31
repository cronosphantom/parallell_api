import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import { Profile, User, UserLogin } from "../models";
import { UserInput, AuthPayload, LoginInput, AddressBookEntryInput } from "../inputs";
import { DeleteResult, Repository } from "typeorm";
import { AddressBookEntry } from "../models";



@Resolver(of => AddressBookEntry)
export class AddressBookEntryResolver {
  constructor( ) {

  }

  @Query(() => AddressBookEntry,{nullable:true})
  async addressBookEntry(@Arg("id",{nullable:true}) id: string) { 
    let obj =  await  AddressBookEntry.findOne(id);
    return obj;
  }


  @Query(() => [AddressBookEntry])
  async addressBook(
    @Arg("profile", { nullable: false }) profile: string) {
   
    const objs = await AddressBookEntry.find({where: {profile: profile}});
    return objs
  }


  @Mutation(() => AddressBookEntry,{nullable:true}) 
  async createAddressBookEntry (
    @Arg("data", () => AddressBookEntryInput,{nullable:true}) data: AddressBookEntryInput
    
    ): Promise<AddressBookEntry> {

      const profile = await Profile.findOne(data.profile) 
   
      let result = await AddressBookEntry.save(AddressBookEntry.create({...data,profile})) 
      let addressBookEntry = await AddressBookEntry.findOne({
        where:{
          id:result.id
        },
        relations:['profile']
      }) || new AddressBookEntry()
      

      return addressBookEntry;
  }
  
  @Mutation(() => AddressBookEntry,{nullable:true})
  async updateAddressBookEntry (
    @Arg("data", () => AddressBookEntryInput,{nullable:true}) data: AddressBookEntryInput,
    @Arg("id",{nullable:true}) id: string
    
    ): Promise<AddressBookEntry> {
      
      const profile = await Profile.findOne(data.profile) 
      await AddressBookEntry.update(id,AddressBookEntry.create({...data,profile})) 
     const updatedAddressBookEntry = await AddressBookEntry.findOne( {
        where:{
               id:id
         },
         relations:['profile']
     }) || new AddressBookEntry();
 
     return updatedAddressBookEntry;
  }

  @Mutation(() => User,{nullable:true})
  async deleteAddressBookEntry(@Arg("id",{nullable:true}) id: string) : Promise<AddressBookEntry> {
    const addressBookEntry = await AddressBookEntry.findOne({ where:{
      id
    },
     
    relations:['profile'] }) || new AddressBookEntry()
    const deleteResult: DeleteResult = await AddressBookEntry.delete({id: id});
    

    return addressBookEntry
  }

 

}
