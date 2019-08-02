// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import { gql } from "apollo-boost";

// ----------------------------------------------------------------------------------------------------- //
// * ---------------------------------------------- Queries --------------------------------------------- //

export const GET_USER =
    gql`
        query GetUser {
            currentUser {
                user_id
                name
            }
        }
    `;

export const GET_AUTHUSER_TWEETS =
    gql`
        query GetAuthUserTweets {
            currentUser {
                userTimelineTweets {
                    created_at
                    id
                    id_str
                    full_text
                    retweet_count
                    favorite_count
                    favorited
                    retweeted
                    user {
                        id
                        name
                        screen_name
                        verified
                        statuses_count
                        friends_count
                        followers_count
                        profile_image_url_https
                        profile_link_color
                        profile_banner_url
                    }
                    entities {
                        hashtags {
                            text
                        }
                        media {
                            display_url
                            media_url_https
                        }
                    }
                }
            }
        }
    `;

export const GET_USERPROFILE_TWEETS =
    gql`
        query GetUserProfileTweets($screen_name: String!) {
            currentUser {
                userProfileTweets(screen_name: $screen_name) {
                    created_at
                    id
                    id_str
                    full_text
                    retweet_count
                    favorited
                    favorite_count
                    retweeted
                    user {
                        id
                        name
                        screen_name
                        verified
                        statuses_count
                        friends_count
                        followers_count
                        favourites_count
                        profile_image_url_https
                        profile_banner_url
                        created_at
                        description
                        profile_background_image_url_https
                        profile_background_image_url
                        profile_link_color
                    }
                    entities {
                        hashtags {
                            text
                        }
                        media {
                            display_url
                            media_url_https
                        }
                    }
                }
            }
        }
    `;

export const GET_TRENDING_TOPICS =
    gql`
        query GetTrendingTopics {
            currentUser {
                trendingTopics {   
                    trends {
                        name
                        url
                        query
                        tweet_volume
                    } 
                }
            }
        }
    `;

export const GET_SUGGESTED_CATEGORIES =
    gql`
        query GetSuggestedCategories {
            currentUser {
                user_id
                name
                suggestedCategory {
                    name
                    slug
                    id
                }
            }
        }
    `;

export const GET_SUGGESTED_CATEGORIES_MEMBERS_GROUP =
    gql`
        query GetSuggestedCategoriesMembersGroup($slug: String!) {
            currentUser {
                suggestedCategorySlug(slug: $slug) {
                    users {
                        id
                        id_str
                        name
                        screen_name
                        profile_image_url_https
                        verified
                        statuses_count
                        friends_count
                    }
                }
            }
        }
    `;

export const COMPARE_FRIENDSHIPS = 
    gql`
        query CompareRelationship($target_screenName: String!, $source_screenName: String!) {
            currentUser {
                compareRelationship(target_screenName: $target_screenName, source_screenName: $source_screenName) {
                    relationship {
                        target {
                            id
                            screen_name
                            following
                            followed_by
                        }
                        source {
                            id
                            screen_name
                            following
                        }
                    }
                }
            }
        }
    `;

export const VERIFY_USER =
    gql`
        query VerifyUser {
            currentUser {
                user_id
                name
                verifyCredentials {
                    id
                    id_str
                    name
                    screen_name
                    description
                    verified
                    followers_count
                    friends_count
                    favourites_count
                    statuses_count
                    created_at
                    profile_background_color
                    profile_background_image_url_https
                    profile_banner_url
                    profile_link_color
                    profile_image_url_https
                    profile_text_color
                }
            }
        }
    `;

export const USERS_FOLLOWERS =
    gql`
        query UsersFollowers($screen_name: String!) {
            currentUser {
                usersFollowers(screen_name: $screen_name) {
                    previous_cursor_str
                    next_cursor_str
                    users {
                        id
                        id_str
                        name
                        screen_name
                        description
                        verified
                        followers_count
                        friends_count
                        favourites_count
                        statuses_count
                        created_at
                        profile_background_color
                        profile_background_image_url_https
                        profile_banner_url
                        profile_image_url_https
                        profile_link_color
                    }
                }
            }
        }
    `;

export const USERS_FOLLOWING =
    gql`
        query UsersFollowing($screen_name: String!) {
            currentUser {
                usersFollowing(screen_name: $screen_name) {
                    previous_cursor_str
                    next_cursor_str
                    users {
                        id
                        id_str
                        name
                        screen_name
                        description
                        verified
                        followers_count
                        friends_count
                        favourites_count
                        statuses_count
                        created_at
                        profile_background_color
                        profile_background_image_url_https
                        profile_banner_url
                        profile_link_color
                        profile_image_url_https
                    }
                }
            }
        }
    `;

export const GET_USERS_LIKES = 
    gql`
        query GetUsersFavorites($screen_name: String!) {
            currentUser {
                getUsersFavorites(screen_name: $screen_name) {
                    created_at
                    id
                    id_str
                    full_text
                    retweet_count
                    favorite_count
                    favorited
                    retweeted
                    user {
                        id
                        name
                        screen_name
                        verified
                        statuses_count
                        friends_count
                        followers_count
                        profile_image_url_https
                    }
                    entities {
                        hashtags {
                            text
                        }
                        media {
                            display_url
                            media_url_https
                        }
                    }
                }
            }
        }
    `;

export const GET_USER_LISTS = 
    gql`
        query GetUserLists($screen_name: String!) {
            currentUser {
                getLists(screen_name: $screen_name) {
                    name
                    slug
                    id
                    id_str
                    subscriber_count
                    member_count
                    mode
                    description
                    full_name
                    created_at
                    following
                    user {
                        screen_name
                        profile_image_url_https
                        profile_link_color
                    }
                }
            }
        }
    `;

export const GET_LISTS_TIMELINE = 
    gql`
        query GetListsTimeline($list_id: String!) {
            currentUser {
                getListsTimeline(list_id: $list_id) {
                    created_at
                    id
                    id_str
                    full_text
                    retweet_count
                    favorite_count
                    favorited
                    retweeted
                    user {
                        id
                        name
                        screen_name
                        verified
                        statuses_count
                        friends_count
                        followers_count
                        profile_image_url_https
                        profile_link_color
                    }
                    entities {
                        hashtags {
                            text
                        }
                        media {
                            display_url
                            media_url_https
                        }
                    }
                }
            }
        }
    `;

export const GET_LISTS_SHOW = 
    gql`
        query GetListsShow($list_id: String!) {
            currentUser {
                getListsShow(list_id: $list_id) {
                    name
                    slug
                    id
                    id_str
                    subscriber_count
                    member_count
                    mode
                    description
                    full_name
                    created_at
                    following
                    user {
                        screen_name
                        profile_image_url_https
                    }
                }
            }
        }
    `;

export const SHOW_USER =
    gql`
        query ShowUser($screen_name: String!) {
            currentUser {
                showUser(screen_name: $screen_name) {
                    id
                    id_str
                    name
                    screen_name
                    description
                    verified
                    followers_count
                    friends_count
                    favourites_count
                    statuses_count
                    created_at
                    profile_background_color
                    profile_background_image_url
                    profile_background_image_url_https
                    profile_banner_url
                    profile_link_color
                    profile_image_url_https
                }
            }
        }
    `;

export const SEARCH_TWEETS =
    gql`
        query SearchTweets($query: String!) {
            currentUser {
                searchTweets(query: $query) {
                    statuses {
                        created_at
                        id
                        id_str
                        full_text
                        retweet_count
                        favorite_count
                        favorited
                        retweeted
                        user {
                            id
                            name
                            screen_name
                            verified
                            statuses_count
                            friends_count
                            followers_count
                            profile_image_url_https
                            profile_link_color
                        }
                        entities {
                            hashtags {
                                text
                            }
                            media {
                                display_url
                                media_url_https
                            }
                        }
                    }
                }
            }
        }
    `;

// ------------------------------------------------------------------------------------------------------ //
// * ---------------------------------------------- Mutations --------------------------------------------- //

export const CREATE_USER_TWEET =
    gql`
        mutation CreateTweet($full_text: String!) {
            createTweet(full_text: $full_text) {
                full_text
            }
        }
    `;

export const FOLLOW_USER =
    gql`
        mutation FollowUser($id: String!) {
            followUser(id: $id) {
                id
                name
                screen_name
            }
        }
    `;

export const UNFOLLOW_USER =
    gql`
        mutation UnfollowUser($id: String!) {
            unfollowUserReqest(id: $id) {
                id
                name
                screen_name
            }
        }
    `;

export const LIKE_STATUS =
    gql`
        mutation likeStatus($id: String!) {
            likeStatus(id: $id) {
                id
            }
        }
    `;

export const UNLIKE_STATUS = 
    gql`
        mutation unlikeStatus($id: String!) {
            unlikeStatus(id: $id) {
                id
            }
        }
    `;

export const RETWEET_STATUS = 
    gql`
        mutation RetweetStatus($id: String!) {
            retweet(id: $id) {
                tweet {
                    text
                    user {
                        screen_name
                    }
                }
            }
        }
    `;

export const UNRETWEET_STATUS = 
    gql`
        mutation UnRetweetStatus($id: String!) {
            unRetweet(id: $id) {
                id
            }
        }
    `;

export const DELETE_STATUS = 
    gql`
        mutation DeleteStatus($id: String!) {
            deleteStatus(id: $id) {
                id
            }
        }
    `;

export const SUBSCRIBE_TO_LIST =
    gql`
        mutation SubscribeToList($list_id: String!) {
            subscribeToList(list_id: $list_id) {
                id
                id_str
                name
                slug
            }
        }
    `;

export const UNSUBSCRIBE_TO_LIST =
    gql`
        mutation UnsubscribeToList($list_id: String!) {
            unsubscribeToList(list_id: $list_id) {
                id
                id_str
                name
                slug
            }
        }
    `;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //


