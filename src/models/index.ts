const {  gql } = require('apollo-server');

export * from './User';
export * from './Auth';
export * from './Profile';
export * from './ProfileUser';
export * from './AddressBookEntry';
export * from './CalendarItem';
export * from './Child';
export * from './Discussion';
export * from './DiscussionMessage';
export * from './Expense';
export * from './ExpenseItem';
export * from './Note';
export * from './Password';



export const typeDefs = gql`
    type Query{
        _: String
        testQuery: String
        languages: [Language]
    }
    type Mutation {
        _:String
    }
    type Address {
        street: String
        city: String
        state: String
        country: String
        postalCode: String
        latitude: Float
        longitude: Float
    }
    type Language{
        code: String
        name: String
        icon: String
    }
    type i18n {
        en: String
        fr: String
        es: String
        ro: String
        sc: String
        ko: String
        jp: String
    }
`

 


 

