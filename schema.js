// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { gql } = require('apollo-server');
const client = require('./client/src/twitterkeys');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const typeDefs =
    gql`
        type Query {
            currentUser: User
            currentUserTimelineTweets: UserTweets
        }

        type UserTweets {
            created_at: String!
            id: String!
            id_str: String!
            text: String!
            truncated: String!
            geo: String!,
            coordinates: String!,
            place: String!,
            contributors: String!,
            is_quote_status: String!,
            retweet_count: String!,
            favorite_count: String!,
            favorited: String!,
            retweeted: String!,
            lang: String!
        }

        type User {
            sub: String!
            nickname: String!
            name: String!
            picture: String!
            updated_at: String!
        }
    `;

const resolvers = {
    Query: {
        // The 3rd argument(user) is being pulled off of the context in server.js
        currentUser: (parent, args, user) => {
            return user
        },
        currentUserTimelineTweets: (parent, args, user) => {
            const params = { screen_name: user.name };
            return client.get('statuses/user_timeline', params, (error, data, response) => {
                console.log(data[0])
                return data[0]
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
