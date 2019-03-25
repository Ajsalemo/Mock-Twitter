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
        }

        type Mutation {
            createTweet(text: String!): UserTimelineTweets
        }

        type User {
            sub: String!
            nickname: String!
            name: String!
            picture: String!
            updated_at: String!
            userTimelineTweets: [UserTimelineTweets]
        }

        # Object for the API call to Twitters 'Statuses/user_timeline' path
        type UserTimelineTweets {
            created_at: String
            id: String
            id_str: String
            text: String
            truncated: String
            geo: String,
            coordinates: String,
            place: String,
            contributors: String,
            is_quote_status: String,
            retweet_count: String,
            favorite_count: String,
            favorited: String,
            retweeted: String,
            lang: String
        }
    `;

const resolvers = {
    Query: {
        // The 3rd argument(user) is being pulled off of the context in server.js
        currentUser: (parent, args, user) => {
            return user;
        }
    },
    User: {
        userTimelineTweets: async (parent, args, user) => {
            const requestUserTimelineTweets = await client.get('statuses/user_timeline', { screen_name: user.name });
            const responserUserTimelineTweets = await requestUserTimelineTweets;
            return responserUserTimelineTweets
        }
    },
    Mutation: {
        createTweet: async (parent, args, context) => {
            const addNewTweetRequest = await client.post('statuses/update', { status: args.text });
            const addNewTweetResponse = await addNewTweetRequest;
            return addNewTweetResponse;
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
