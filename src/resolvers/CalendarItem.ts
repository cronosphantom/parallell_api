import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import { CalendarItemInput } from "../inputs";
import { DeleteResult, In, Repository } from "typeorm";
import { CalendarItem, Child, Profile, User } from "../models";

@Resolver(of => CalendarItem)
export class CalendarItemResolver {
	constructor() {
	}

	@Query(() => CalendarItem, { nullable: true })
	async calendarItem(@Arg("id", { nullable: true }) id: string) {
		let obj = await CalendarItem.findOne(id,{relations:['children']});
		return obj;
	}

	@Query(() => [CalendarItem])
	async calendarItems(
		@Arg("profileId", { nullable: false }) profileId: string) {
		const objs = await CalendarItem.find({ where: { profile: profileId } });
		return objs
	}

	@Mutation(() => CalendarItem, { nullable: true })
	async createCalendarItem(
		@Arg("data", () => CalendarItemInput, { nullable: false }) data: CalendarItemInput,
		@Arg("profileId", () => String, { nullable: false }) profileId: String,
		@Arg("userId", () => String, { nullable: false }) userId: String,
		@Arg("children", () => [String], { nullable: false }) children: [String],
	): Promise<CalendarItem> {
		const profile = await Profile.findOne({ where: { id:profileId }, }) || new Profile()
		const user = await User.findOne({ where: { id:userId }, }) || new User()
		const child = await Child.findByIds(children) 
		let calendarData = new CalendarItem();
		calendarData.profile = profile
		calendarData.createdBy = user
		calendarData.children = child
		
		Object.assign(calendarData,data)
		console.log(calendarData)
		await calendarData.save()
		//let result = await CalendarItem.create<CalendarItem>(data).save();
		return calendarData;
	}

	@Mutation(() => CalendarItem, { nullable: true })
	async updateCalendarItem(
		@Arg("data", () => CalendarItemInput, { nullable: true }) data: CalendarItemInput,
		@Arg("id", { nullable: true }) id: string
	): Promise<CalendarItem> {
		await CalendarItem.update(id, CalendarItem.create({ ...data }))
		const obj = await CalendarItem.findOne({ where: { id }, }) || new CalendarItem();
		return obj;
	}

	@Mutation(() => CalendarItem, { nullable: true })
	async deleteCalendarItem(@Arg("id", { nullable: true }) id: string): Promise<CalendarItem> {
		const obj = await CalendarItem.findOne({
			where: {
				id
			},
		}) || new CalendarItem()
		const deleteResult: DeleteResult = await CalendarItem.delete({ id: id });
		return obj
	}
}
