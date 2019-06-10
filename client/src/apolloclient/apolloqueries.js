// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import { gql } from "apollo-boost";

// ----------------------------------------------------------------------------------------------------- //
// ---------------------------------------------- Queries --------------------------------------------- //

export const GET_USER =
    gql`
        query GetUser {
            currentUser {
                sub
                nickname
                name
                picture
                updated_at
            }
        }
    `;

export const GET_USER_STATUS_COUNT =
    gql`
        query GetUserStatusCount {
            currentUser {
                userTweetStatusCount {
                    user {
                        statuses_count
                        followers_count
                        friends_count
                    }
                }
            }
        }
    `;

export const GET_AUTHUSER_TWEETS =
    gql`
        query GetAuthUserTweets {
            currentUser {
                picture
                nickname
                name
                userTimelineTweets {
                    created_at
                    id
                    id_str
                    full_text
                    truncated
                    geo
                    coordinates
                    place
                    contributors
                    is_quote_status
                    retweet_count
                    favorite_count
                    favorited
                    retweeted
                    lang
                    user {
                        id
                        name
                        screen_name
                        verified
                        statuses_count
                        friends_count
                        followers_count
                        profile_image_url_https
                        in_reply_to_status_id_str
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
                picture
                nickname
                name
                userProfileTweets(screen_name: $screen_name) {
                    created_at
                    id
                    id_str
                    full_text
                    truncated
                    geo
                    coordinates
                    place
                    contributors
                    is_quote_status
                    retweet_count
                    favorited
                    favorite_count
                    retweeted
                    lang
                    user {
                        id
                        name
                        screen_name
                        verified
                        statuses_count
                        friends_count
                        followers_count
                        favourites_count
                        listed_count
                        profile_image_url_https
                        in_reply_to_status_id_str
                        profile_banner_url
                        created_at
                        description
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
                        promoted_content
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
                suggestedCategory {
                    name
                    slug
                    size
                }
            }
        }
    `;

export const GET_SUGGESTED_CATEGORIES_MEMBERS_GROUP =
    gql`
        query GetSuggestedCategoriesMembersGroup($slug: String!) {
            currentUser {
                nickname
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
                nickname
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
// ------------------------------------------------------------------------------------------------------ //
// ---------------------------------------------- Mutations --------------------------------------------- //

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
                name
                screen_name
            }
        }
    `;

export const UNLIKE_STATUS = 
    gql`
        mutation unlikeStatus($id: String!) {
            unlikeStatus(id: $id) {
                id
                name
                screen_name
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
                name
                screen_name
            }
        }
    `;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //


