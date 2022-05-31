// src/index.ts
import * as dotenv from 'dotenv';
dotenv.config();

import "reflect-metadata";
import { createConnection } from "typeorm";
import { ApolloServer } from "apollo-server";
import {buildSchema} from "type-graphql";

let res =  [__dirname + "/resolvers/*.ts"]
console.log(res, "OK")
const corsOptions = {
  origin: '*',
  credentials: true
}

console.log(process.env.NODE_ENV)
async function main() {
  console.log("Launching DB Server")
  const connection = await createConnection()
  const schema = await buildSchema({
  
      //resolvers: [UserResolver, UserBillingResolver, UserMessageResolver, UserPondResolver]
      resolvers:  [__dirname + "/resolvers/*.ts"]
  })
  const server = new ApolloServer({ schema,cors: corsOptions })

  const portNumber = process.env.SERVER_PORT || 4003
  console.log("Launching GraphQL Server on: " + portNumber)
  await server.listen( portNumber)
  console.log(new Date(new Date().toUTCString()))
  console.log("API Server is Ready!")
}
main();