import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import { ExpenseItemInput } from "../inputs";
import { DeleteResult, Repository } from "typeorm";
import { ExpenseItem, Profile, User } from "../models";

@Resolver(of => ExpenseItem)
export class ExpenseItemResolver {
	constructor() {
	}

	@Query(() => ExpenseItem, { nullable: true })
	async expenseItem(@Arg("id", { nullable: true }) id: string) {
		let obj = await ExpenseItem.findOne(id,{relations:['profile','split1User','split2User'] });
		return obj;
	}

	@Query(() => [ExpenseItem])
	async expenseItems(
		@Arg("profileId", { nullable: false }) profileId: string) {
		const objs = await ExpenseItem.find({ where: { profile: profileId },relations:['profile','split1User','split2User'] });
		return objs
	}

	@Mutation(() => ExpenseItem, { nullable: true })
	async createExpenseItem(
		@Arg("data", () => ExpenseItemInput, { nullable: false }) data: ExpenseItemInput,
		@Arg("profileId", () => String, { nullable: false }) profileId: String,
		@Arg("userId", () => String, { nullable: false }) userId: String,
		@Arg("split2UserId", () => String, { nullable: true }) split2UserId: String,
	): Promise<ExpenseItem> {
		const profile = await Profile.findOne({ where: { id:profileId }, }) || new Profile()
		const user = await User.findOne({ where: { id:userId }, }) || new User()
		let expenseItemData = new ExpenseItem();
		if(split2UserId){
			const split2User = await User.findOne({ where: { id:split2UserId }, }) || new User()
			expenseItemData.split2User = split2User
		}
		
		expenseItemData.profile = profile
		expenseItemData.split1User = user
		expenseItemData.createdBy=user
		Object.assign(expenseItemData,data)
		await expenseItemData.save()
		console.log(expenseItemData)
		//let result = await ExpenseItem.create<ExpenseItem>(expenseItemData).save();
		return expenseItemData;
	}

	@Mutation(() => ExpenseItem, { nullable: true })
	async updateExpenseItem(
		@Arg("data", () => ExpenseItemInput, { nullable: true }) data: ExpenseItemInput,
		@Arg("id", { nullable: true }) id: string
	): Promise<ExpenseItem> {
		await ExpenseItem.update(id, ExpenseItem.create({ ...data }))
		const obj = await ExpenseItem.findOne({ where: { id }, relations:['profile','split1User','split2User'] }) || new ExpenseItem();
		return obj;
	}

	@Mutation(() => ExpenseItem, { nullable: true })
	async deleteExpenseItem(@Arg("id", { nullable: true }) id: string): Promise<ExpenseItem> {
		const obj = await ExpenseItem.findOne({
			where: {
				id
			},
		}) || new ExpenseItem()
		const deleteResult: DeleteResult = await ExpenseItem.delete({ id: id });
		return obj
	}
}
