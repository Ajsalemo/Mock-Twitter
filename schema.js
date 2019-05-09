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
            createTweet(full_text: String!): UserTimelineTweets
            followUser(id: String!): UserObject
            unfollowUserReqest(id: String!): UserObject
            likeStatus(id: String!): UserObject
            unlikeStatus(id: String!): UserObject
            retweet(id: String!): RetweetObject
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
            compareRelationship(target_screenName: String!, source_screenName: String!): RelationshipWrapper 
            userTweetStatusCount: [UserTimelineTweets]
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
            full_text: String
            truncated: String
            geo: String
            coordinates: String
            place: String
            contributors: String
            is_quote_status: String
            retweet_count: String
            favorite_count: String
            favorited: Boolean
            retweeted: Boolean
            lang: String
            user: UserTweetObject
            entities: Entities
        }

        # Object that holds arrays for hashtags, medias or user mentions
        type Entities {
            hashtags: [Hashtag]
            media: [Media]
        }

        type Hashtag {
            text: String
        }

        type Media {
            display_url: String
            media_url_https: String
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

        # Object that is generated inside timeline tweet responses
        type UserTweetObject {
            name: String 
            in_reply_to_status_id_str: String
            profile_sidebar_fill_color: String
            profile_background_tile: String
            profile_sidebar_border_color: String 
            profile_image_url: String 
            created_at: String 
            location: String 
            follow_request_sent: String 
            id_str: String
            is_translator: Boolean
            profile_link_color: String 
            default_profile: Boolean
            url: String
            contributors_enabled: Boolean
            favourites_count: String
            utc_offset: String
            profile_image_url_https: String
            id: String
            listed_count: String
            profile_use_background_image: String
            profile_text_color: String
            followers_count: String
            lang: String
            protected: Boolean
            geo_enabled: Boolean
            notifications: Boolean
            description: String
            profile_background_color: String
            verified: Boolean
            time_zone: String
            profile_background_image_url_https: String
            statuses_count: String
            profile_background_image_url: String
            default_profile_image: Boolean
            friends_count: String
            following: Boolean
            show_all_inline_media: Boolean
            screen_name: String
        }

        # Friendship/followers relationship object wrapper
        type RelationshipWrapper {
            relationship: Relationship
        }

        # Friendship/followers relationship object
        type Relationship {
            source: Source
            target: Target
        }

        # Friendship/followers comparison
        type Source {
            id: String!
            screen_name: String!
            following: Boolean
        }

        # Friendship/followers comparison
        type Target {
            id: String!
            screen_name: String!
            following: Boolean
            followed_by: Boolean
        }

        # Retweet Object
        type RetweetObject {
            tweet: RetweetObjectWrapper
        }

        # Retweet Object Wrapper
        type RetweetObjectWrapper {
            text: String
            user: TweetedUser
        }

        # User property
        type TweetedUser {
            screen_name: String
        }
    `;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const resolvers = {
    Query: {
        // The 3rd argument(user) is being pulled off of the context in server.js
        currentUser: (parent, args, user) => {
            return user;
        }
    },
    User: {
        userTimelineTweets: async (parent, args, user) => {
            const requestUserTimelineTweets = await client.get('statuses/home_timeline', { screen_name: user.name, tweet_mode: 'extended' });
            const responserUserTimelineTweets = await requestUserTimelineTweets;
            return responserUserTimelineTweets;
        },
        userTweetStatusCount: async (parent, args, user) => {
            const userTweetStatusRequest = await client.get('statuses/user_timeline', { screen_name: user.name });
            const userTweetStatusResponse = await userTweetStatusRequest;
            return userTweetStatusResponse;
        },
        trendingTopics: async (parent, args, context) => {
            const getTrendingTopicsRequest = await client.get('trends/place', { id: 1 });
            const getTrendingTopicsResponse = await getTrendingTopicsRequest;
            return getTrendingTopicsResponse;
        },
        suggestedCategory: async (parent, args, user) => {
            const suggestedCategoryRequest = await client.get('users/suggestions', { screen_name: user.name });
            const suggestedCategoryResponse = await suggestedCategoryRequest;
            return suggestedCategoryResponse;
        },
        suggestedCategorySlug: async (parent, args, user) => {
            const categorySlugRequest = await client.get(`users/suggestions/${args.slug}`, { screen_name: user.name });
            const categorySlugResponse = await categorySlugRequest;
            return categorySlugResponse;
        },
        compareRelationship: async (parent, args, context) => {
            const compareRelationshipRequest = await client.get('friendships/show', { source_screen_name: args.source_screenName, target_screen_name: args.target_screenName });
            const compareRelationshipResponse = await compareRelationshipRequest;
            return compareRelationshipResponse;
        }
    },
    Mutation: {
        createTweet: async (parent, args, context) => {
            const addNewTweetRequest = await client.post('statuses/update', { status: args.full_text });
            const addNewTweetResponse = await addNewTweetRequest;
            return addNewTweetResponse;
        },
        followUser: async (parent, args, context) => {
            const followUserRequest = await client.post('friendships/create', { id: args.id });
            const followUserResponse = await followUserRequest;
            return followUserResponse;
        },
        unfollowUserReqest: async (parent, args, context) => {
            const unfollowUserRequest = await client.post('friendships/destroy', { id: args.id });
            const unfollowUserResponse = await unfollowUserRequest;
            return unfollowUserResponse;
        },
        likeStatus: async (parent, args, context) => {
            const likeStatusRequest = await client.post('favorites/create', { id: args.id });
            const likeStatusResponse = await likeStatusRequest;
            return likeStatusResponse;
        },
        unlikeStatus: async (parent, args, context) => {
            const unlikeStatusRequest = await client.post('favorites/destroy', { id: args.id });
            const unlikeStatusResponse = await unlikeStatusRequest;
            return unlikeStatusResponse;
        },
        retweet: async (parent, args, context) => {
            const retweetRequest = await client.post('statuses/retweet', { id: args.id });
            const retweetResponse = await retweetRequest;
            console.log(retweetResponse);
            return retweetResponse;
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
