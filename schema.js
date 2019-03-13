// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { gql } = require('apollo-server');
const Client = require('./twitterkeys');

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
        retrieveAuthUserTweets: (parent, args, user) => {
            const params = { screen_name: 'Letterman Icon' };
            Client.get('statuses/user_timeline', params, (error, tweets, response) => {
                return response;
            });
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
