// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { gql } = require('apollo-server-express');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const typeDefs = gql`
    type User {
        sub: String
        nickname: String
        name: String
        picture: String
        updated_at: String
    }

    type Query {
        currentUser: User
    }
`;

const resolvers = {
    Query: {
        currentUser: async (parent, args, { user }) => {
            console.log(user)
            const email = await user;
        }
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

module.exports = {
    typeDefs,
    resolvers
};