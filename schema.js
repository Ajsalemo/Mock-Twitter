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
            followUser(id: String!): UserObject
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
            suggestedCategorySlug(slug: String!): SuggestedCategorySlug
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

        # Suggested categories to follow
        type SuggestedCategorySlug {
            name: String
            slug: String
            size: String
            users: [UserObject]
        }

        # Suggested catergory members 
        type UserObject {
            id: String
            id_str: String
            name: String
            screen_name: String
            location: String
            url: String
            description: String
            derived: String
            verified: Boolean
            followers_count: String
            friends_count: Int
            listed_count: Int
            favourites_count: Int
            statuses_count: Int
            created_at: String
            geo_enabled: Boolean
            lang: String
            profile_background_color: String
            profile_background_image_url: String
            profile_background_image_url_https: String
            profile_background_tile: String
            profile_banner_url: String
            profile_image_url: String
            profile_image_url_https: String
            profile_link_color: String
            profile_sidebar_border_color: String
            profile_sidebar_fill_color: String
            profile_text_color: String
            profile_use_background_image: String
            default_profile: Boolean
            default_profile_image: Boolean
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
            return suggestedCategoryResponse
        },
        suggestedCategorySlug: async (parent, args, user) => {
            const categorySlugRequest = await client.get(`users/suggestions/${args.slug}`, { screen_name: user.name });
            const categorySlugResponse = await categorySlugRequest;
            return categorySlugResponse
        }
    },
    Mutation: {
        createTweet: async (parent, args, context) => {
            const addNewTweetRequest = await client.post('statuses/update', { status: args.text });
            const addNewTweetResponse = await addNewTweetRequest;
            return addNewTweetResponse;
        },
        followUser: async (parent, args, user) => {
            const followUserRequest = await client.post('friendships/create', { id: args.id, scree_name: user.name });
            const followUserResponse = await followUserRequest;
            console.log(followUserResponse);
            return followUserResponse
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
