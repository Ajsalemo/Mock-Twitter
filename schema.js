// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { gql } = require('apollo-server');
const twitterNetworkCall = require('./client/src/helpers/twitterkeys');

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
            unRetweet(id: String!): UserTweetObject
            deleteStatus(id: String!): UserTweetObject
            subscribeToList(list_id: String!): UsersLists
            unsubscribeToList(list_id: String!): UsersLists
        }

        # User Object
        type User {
            user_id: String
            name: String
            userTimelineTweets: [UserTimelineTweets]
            userProfileTweets(screen_name: String!): [UserProfileTimeline]
            trendingTopics: [trendsWrapper]
            compareRelationship(target_screenName: String!, source_screenName: String!): RelationshipWrapper 
            verifyCredentials: UserObject
            usersFollowers(screen_name: String!): UsersFollowers
            usersFollowing(screen_name: String!): UsersFollowers
            getUsersFavorites(screen_name: String!): [UserTimelineTweets]
            getLists(screen_name: String!): [UsersLists]
            getListsTimeline(list_id: String!): [UserTimelineTweets]
            getListsShow(list_id: String!): UsersLists
            showUser(screen_name: String!): UserObject
            searchTweets(query: String!): SearchTweets
        }

        # Object wrapper to iterate
        type trendsWrapper {
            trends: [TrendingTopics]
        }

        # Object for the API call to Twitters 'Statuses/home_timeline' path
        type UserTimelineTweets {
            created_at: String
            id: String
            id_str: String
            full_text: String
            retweet_count: String
            favorite_count: String
            favorited: Boolean
            retweeted: Boolean
            user: UserTweetObject
            entities: Entities
        }

        # Object for the API call to Twitters 'Statuses/user_timeline' path
        type UserProfileTimeline {
            created_at: String
            id: String
            id_str: String
            full_text: String
            retweet_count: String
            favorite_count: String
            favorited: Boolean
            retweeted: Boolean
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

        type SearchTweets {
            statuses: [UserTimelineTweets]
        }

        # Currently trending topics
        type TrendingTopics {
            name: String
            url: String
            query: String
            tweet_volume: String
        }

        # Suggested categories to follow
        type SuggestedCategory {
            name: String
            slug: String
            size: String
        }

        # Lists that users are subscribed to
        type UsersLists {
            name: String
            slug: String
            id: String
            id_str: String
            subscriber_count: Int
            member_count: Int
            mode: String
            description: String
            full_name: String
            created_at: String
            following: Boolean
            user: UserObject
        }

        # Suggested catergory members 
        type UserObject {
            id: String
            id_str: String
            name: String
            screen_name: String
            description: String
            verified: Boolean
            followers_count: String
            friends_count: Int
            favourites_count: Int
            statuses_count: Int
            created_at: String
            profile_background_color: String
            profile_background_image_url_https: String
            profile_background_image_url: String
            profile_banner_url: String
            profile_image_url_https: String
            profile_link_color: String
        }

        # Object that is generated inside timeline tweet responses
        type UserTweetObject {
            name: String 
            profile_image_url: String 
            created_at: String 
            id_str: String
            profile_link_color: String 
            favourites_count: String
            profile_image_url_https: String
            id: String
            followers_count: String
            description: String
            profile_background_color: String
            verified: Boolean
            profile_background_image_url_https: String
            statuses_count: String
            profile_background_image_url: String
            profile_banner_url: String
            friends_count: String
            following: Boolean
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

        type UsersFollowers {
            previous_cursor_str: String
            next_cursor_str: String
            users: [UserObject]
        }
    `;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const resolvers = {
    Query: {
        // The 3rd argument(user) is being pulled off of the context in server.js
        currentUser: async (parent, args, user) => {
            return user.decodedToken;
        }
    },
    User: {
        userTimelineTweets: async (parent, args, user) => {
            const requestUserTimelineTweets = await twitterNetworkCall(user.access_token, user.access_secret).get('statuses/home_timeline', { tweet_mode: 'extended' });
            const responseUserTimelineTweets = await requestUserTimelineTweets;
            return responseUserTimelineTweets;
        },
        userProfileTweets: async (parent, args, user) => {
            const userProfileTweetsRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('statuses/user_timeline', { screen_name: args.screen_name, tweet_mode: 'extended' });
            const userProfileTweetsResponse = userProfileTweetsRequest;
            return userProfileTweetsResponse;
        },
        trendingTopics: async (parent, args, user) => {
            const getTrendingTopicsRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('trends/place', { id: 1 });
            const getTrendingTopicsResponse = await getTrendingTopicsRequest;
            return getTrendingTopicsResponse;
        },
        compareRelationship: async (parent, args, user) => {
            const compareRelationshipRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('friendships/show', { source_screen_name: args.source_screenName, target_screen_name: args.target_screenName });
            const compareRelationshipResponse = await compareRelationshipRequest;
            return compareRelationshipResponse;
        },
        verifyCredentials: async (parent, args, user) => {
            const verifyCredentialsRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('account/verify_credentials');
            const verifyCredentialsResponse = await verifyCredentialsRequest;
            return verifyCredentialsResponse;
        },
        usersFollowers: async (parent, args, user) => {
            const usersFollowersRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('friends/list', { screen_name: args.screen_name });
            const usersFollowersResponse = usersFollowersRequest;
            return usersFollowersResponse;
        },
        usersFollowing: async (parent, args, user) => {
            const usersFollowingRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('followers/list', { screen_name: args.screen_name });
            const usersFollowingResponse = usersFollowingRequest;
            return usersFollowingResponse;
        },
        getUsersFavorites: async (parent, args, user) => {
            const getUsersFavoritesRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('favorites/list', { screen_name: args.screen_name, tweet_mode: 'extended' });
            const getUsersFavoritesResponse = getUsersFavoritesRequest;
            return getUsersFavoritesResponse;
        },
        getLists: async (parent, args, user) => {
            const getListsRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('lists/list', { screen_name: args.screen_name });
            const getListsResponse = getListsRequest;
            return getListsResponse;
        },
        getListsTimeline: async (parent, args, user) => {
            const getListsTimelineRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('lists/statuses', { list_id: args.list_id, tweet_mode: 'extended', count: '20' });
            const getListsTimelineResponse = await getListsTimelineRequest;
            return getListsTimelineResponse;
        },
        getListsShow: async (parent, args, user) => {
            const getListsShowRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('lists/show', { list_id: args.list_id });
            const getListsShowResponse = await getListsShowRequest;
            return getListsShowResponse;
        },
        showUser: async (parent, args, user) => {
            const showUserRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('users/show', { screen_name: args.screen_name });
            const showUserResponse = await showUserRequest;
            return showUserResponse;
        },
        searchTweets: async (parent, args, user) => {
            const searchTweetsRequest = await twitterNetworkCall(user.access_token, user.access_secret).get('search/tweets', { q: args.query, tweet_mode: 'extended' });
            const searchTweetsResponse = await searchTweetsRequest;
            console.log(searchTweetsResponse)
            return searchTweetsResponse;
        }
    },
    Mutation: {
        createTweet: async (parent, args, user) => {
            const addNewTweetRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('statuses/update', { status: args.full_text });
            const addNewTweetResponse = await addNewTweetRequest;
            return addNewTweetResponse;
        },
        followUser: async (parent, args, user) => {
            const followUserRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('friendships/create', { id: args.id });
            const followUserResponse = await followUserRequest;
            return followUserResponse;
        },
        unfollowUserReqest: async (parent, args, user) => {
            const unfollowUserRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('friendships/destroy', { id: args.id });
            const unfollowUserResponse = await unfollowUserRequest;
            return unfollowUserResponse;
        },
        likeStatus: async (parent, args, user) => {
            const likeStatusRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('favorites/create', { id: args.id });
            const likeStatusResponse = await likeStatusRequest;
            return likeStatusResponse;
        },
        unlikeStatus: async (parent, args, user) => {
            const unlikeStatusRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('favorites/destroy', { id: args.id });
            const unlikeStatusResponse = await unlikeStatusRequest;
            return unlikeStatusResponse;
        },
        retweet: async (parent, args, user) => {
            const retweetRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('statuses/retweet', { id: args.id });
            const retweetResponse = await retweetRequest;
            return retweetResponse;
        },
        unRetweet: async (parent, args, user) => {
            const unRetweetRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('statuses/unretweet', { id: args.id });
            const unRetweetResponse = unRetweetRequest;
            return unRetweetResponse;
        },
        deleteStatus: async (parent, args, user) => {
            const deleteStatusRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('statuses/destroy', { id: args.id });
            const deleteStatusResponse = await deleteStatusRequest;
            return deleteStatusResponse;
        },
        subscribeToList: async (parent, args, user) => {
            const subscribeToListRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('lists/subscribers/create', { list_id: args.list_id });
            const subscribeToListResponse = await subscribeToListRequest;
            return subscribeToListResponse;
        },
        unsubscribeToList: async (parent, args, user) => {
            const unsubscribeToListRequest = await twitterNetworkCall(user.access_token, user.access_secret).post('lists/subscribers/destroy', { list_id: args.list_id });
            const unsubscribeToListResponse = await unsubscribeToListRequest;
            return unsubscribeToListResponse;
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
