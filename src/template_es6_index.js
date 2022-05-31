import '@babel/polyfill'

import {ApolloServer, PubSub} from 'apollo-server'
import resolvers from './resolvers/'
import client from './db'

//const applicationsamplepoint = require('./converts/convert_application_samplepoints')
//const applicationtest = require('./converts/convert_application_tests')
const typeDefs = require('./typeDefs')
const pubsub = new PubSub();

//const mongoCol = client.db.database.collection('master-products');

//Resolvers
// const resolvers = {
//   Query,
//   Mutation
// }

const server = new ApolloServer(
  {
    typeDefs, 
    resolvers,
    context:{
      pubsub,
      mongo:client,
     
    }
  }); 
  const options = {
    port: process.env.PORT || 4000,
    bodyParserOptions: { limit: "10mb", type: "application/json" },
  };
server.listen( options, () => {
 console.log("Ready Sir!!!");

})




