// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { gql } = require('apollo-server');
const client = require('./client/src/twitterkeys');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const typeDefs =
    gql`
        # Root Query
        type Query {
            currentUser: User
        }

        # Root Mutation
        type Mutation {
            createTweet(text: String!): UserTimelineTweets
        }

        # User Object
        type User {
            sub: String!
            nickname: String!
            name: String!
            picture: String!
            updated_at: String!
            userTimelineTweets: [UserTimelineTweets]
            trendingTopics: [trendsWrapper]
            suggestedCategory: [SuggestedCategory]
        }

        # Object wrapper to iterate
        type trendsWrapper {
            trends: [TrendingTopics]
        }

        # Object for the API call to Twitters 'Statuses/user_timeline' path
        type UserTimelineTweets {
            created_at: String
            id: String
            id_str: String
            text: String
            truncated: String
            geo: String
            coordinates: String
            place: String
            contributors: String
            is_quote_status: String
            retweet_count: String
            favorite_count: String
            favorited: String
            retweeted: String
            lang: String
            user: StatusCount
        }

        # Total tweets for the users account
        type StatusCount {
            statuses_count: String
        }

        # Currently trending topics
        type TrendingTopics {
            name: String
            url: String
            promoted_content: String
            query: String
            tweet_volume: String
        }

        # Suggested categories to follow
        type SuggestedCategory {
            name: String
            slug: String
            size: String
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
        },
        trendingTopics: async (parent, args, context) => {
            const getTrendingTopicsRequest = await client.get('trends/place', { id: 1 });
            const getTrendingTopicsResponse = await getTrendingTopicsRequest;
            return getTrendingTopicsResponse
        },
        suggestedCategory: async (parent, args, user) => {
            const suggestedCategoryRequest = await client.get('users/suggestions', { screen_name: user.name });
            const suggestedCategoryResponse = await suggestedCategoryRequest;
            console.log(suggestedCategoryResponse)
            return suggestedCategoryResponse
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
