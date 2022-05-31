import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import { ProfileUserInput } from "../inputs";
import { DeleteResult, Repository } from "typeorm";
import { Profile, ProfileUser, User } from "../models";
import { nanoid } from "nanoid";
import { InviteCodeGenerator } from "../utils/idGenerator";
import { mailer, texter } from "../utils/Sender";


@Resolver(of => ProfileUser)
export class ProfileUserResolver {
	constructor() {
	}

	@Query(() => ProfileUser, { nullable: true })
	async profileUser(@Arg("id", { nullable: true }) id: string) {
		let obj = await ProfileUser.findOne(id, { relations: ['profile', 'user'] });
		return obj;
	}

	@Query(() => [ProfileUser])
	async profileUsers(
		@Arg("profileId", { nullable: false }) profileId: string) {
		const objs = await ProfileUser.find({ where: { profile: profileId }, relations: ['profile', 'user'] });
		return objs
	}

	@Query(() => [ProfileUser])
	async userProfileAccess(
		@Arg("userId", { nullable: false }) userId: string) {
		const objs = await ProfileUser.find({ where: { user: userId }, relations: ['profile'] });
		return objs
	}

	@Mutation(() => ProfileUser, { nullable: true })
	async createProfileUser(
		@Arg("data", () => ProfileUserInput, { nullable: true }) data: ProfileUserInput

	): Promise<ProfileUser> {

		const profile = await Profile.findOne(data.profileId) || new Profile()

		//Generate the Invite Code
		const inviteCode = new InviteCodeGenerator().generate();

		let newObject = new ProfileUser();
		newObject.status = "invited";
		newObject.profile = profile;
		newObject.role = data.role;
		newObject.inviteCode = inviteCode;
		await newObject.save();

		//Send and email or a text message or both ??  IDK!
		// mailer(data.email, 'New InviteCode', `You've been invited to use the Parallell Mobile app. Here is your invite code: ${inviteCode}`)
		// texter(data.phone, `You've been invited to use the Parallell Mobile app. Here is your invite code: ${inviteCode}`);
		return newObject;
	}

	@Mutation(() => String, { nullable: true })
	async connectProfileUser(
		@Arg("inviteCode", () => String, { nullable: true }) inviteCode: String,
		@Arg("userId", () => String, { nullable: true }) userId: String,

	): Promise<String> {
		let result = 'NOT FOUND';
		const profileUser = await ProfileUser.findOne({ where: { inviteCode }, relations: ['user'] })

		if (profileUser) {
			//Check to make sure the code is for the right user
			const user = await User.findOne({ where: { id: userId } });
			if (user) {
				profileUser.user = user;
				profileUser.status = 'active';
				await profileUser.save();
				result = profileUser.id;
			}
		}
		return result;
	}

	@Mutation(() => ProfileUser, { nullable: true })
	async updateProfileUser(
		@Arg("data", () => ProfileUserInput, { nullable: true }) data: ProfileUserInput,
		@Arg("id", { nullable: true }) id: string
	): Promise<ProfileUser> {
		await ProfileUser.update(id, ProfileUser.create({ ...data }))
		const obj = await ProfileUser.findOne({ where: { id }, }) || new ProfileUser();
		return obj;
	}

	@Mutation(() => ProfileUser, { nullable: true })
	async deleteProfileUser(@Arg("id", { nullable: true }) id: string): Promise<ProfileUser> {
		const obj = await ProfileUser.findOne({
			where: {
				id
			},
		}) || new ProfileUser()
		const deleteResult: DeleteResult = await ProfileUser.delete({ id: id });
		return obj
	}
}
