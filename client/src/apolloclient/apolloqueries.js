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
                    created_at
                    id
                    id_str
                    text
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
                        statuses_count
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
                    text
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
                        profile_image_url_https
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
                        name
                        screen_name
                        profile_image_url_https
                        verified
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
        mutation CreateTweet($text: String!) {
            createTweet(text: $text) {
                text
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

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //


