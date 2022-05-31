import { Resolver, Query, Mutation, Arg, ResolverInterface, FieldResolver, Root, Args } from "type-graphql";
import { User, UserLogin } from "../models";
import { UserInput, AuthPayload, LoginInput } from "../inputs";
import { DeleteResult, Repository } from "typeorm";
import * as jwt from "jsonwebtoken";
import * as bcrypt from 'bcryptjs';



@Resolver(of => User)
export class UserResolver {
	constructor() {
	}

	@Query(() => User, { nullable: true })
	async user(@Arg("id", { nullable: true }) id: string) {
		let user = await User.findOne(id, { relations: ['profiles', 'profiles.profile'] });
		return user;
	}

	@Query(() => UserLogin)
	async userLogin(
		@Arg("email", { nullable: false }) email: string,
		@Arg("password", { nullable: false }) password: string) {

		let status = "invalid"
		let token = ""
		// find User 
		const user = await User.find({ where: { email: email.toLowerCase() } });
		let foundUser: any = {}
		if (!(typeof user != "undefined" && user != null && user.length != null &&
			user.length > 0)) {
			//throw new Error('No such user found')
			status = "failure"
			token = "Invalid Username or Password"
			foundUser = {
				id: "NOTFOUND",
				name: "NOTFOUND",
				password: "INVALID"
			}
		} else {
			foundUser = user[0]
			if (bcrypt.compareSync(password, foundUser.password)) {
				//status = foundUser.status
				status = "success"
			}
			else {

				status = "failure"
				token = "Invalid  Password"
				foundUser = {
					id: "NOTFOUND",
					name: "NOTFOUND",
					password: "INVALID"
				}
			}
		}
		console.log(status)
		return {
			status: status,
			token: token,
			user: foundUser,
		}
	}

	@Mutation(() => User, { nullable: true })
	async createUser(
		@Arg("data", () => UserInput, { nullable: true }) data: UserInput

	): Promise<User> {

		let hash = bcrypt.hashSync(data.password, 10);
		data.password = hash
		data.status = "unverified"

		//Generate Verification Code
		//const nanoid = customAlphabet('123456789ABCDEFGHIJKLMN', 5)
		//const vid = nanoid()
		//Include it in Verifcation Email
		//const user = await User.create<User>(data).save();

		let result = await User.create<User>(data).save();
		return result;
	}

	@Mutation(() => User, { nullable: true })
	async updateUser(
		@Arg("data", () => UserInput, { nullable: true }) data: UserInput,
		@Arg("id", { nullable: true }) id: string
	): Promise<User> {
		await User.update(id, User.create({ ...data }))
		const updatedUser = await User.findOne({
			where: {
				id
			},
		}) || new User();
		return updatedUser;
	}

	@Mutation(() => User, { nullable: true })
	async deleteUser(@Arg("id", { nullable: true }) id: string): Promise<User> {
		const user = await User.findOne({
			where: {
				id
			},

		}) || new User()
		const deleteResult: DeleteResult = await User.delete({ id: id });
		return user
	}
}
