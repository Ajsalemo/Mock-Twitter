// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { gql } = require('apollo-server');
const Client = require('./client/src/twitterkeys');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const typeDefs =
    gql`
        type User {
            sub: String!
            nickname: String!
            name: String!
            picture: String!
            updated_at: String!
        }

        type UserTweets {
            created_at: String!
            id: String!
            id_str: String!
            text: String!
            truncated: String!
        }

        type Query {
            currentUser: User
        }

        type Tweets {
            retrieveAuthUserTweets: [UserTweets]
        }
    `;

const resolvers = {
    Query: {
        // The 3rd argument(user) is being pulled off of the context in server.js
        currentUser: (parent, args, user) => {
            return user
        },
    },
    Tweets: {
        retrieveAuthUserTweets: async (parent, args, user) => {
            const res = await Client.get('statuses/user_timeline', {screen_name: 'Letterman Icon'}, (error, tweets, response));
            const { tweets } = res;
            return tweets;
        }
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

module.exports = {
    typeDefs,
    resolvers
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
