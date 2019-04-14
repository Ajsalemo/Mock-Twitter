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
                        statuses_count
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

export const GET_FRIENDSHIP_COMPARISONS = 
    gql`
        query GetFriendshipComparisons($target_screenName: String!, $source_screenName: String!) {
            currentUser {
                compareRelationship(target_screenName: $target_screenName, source_screenName: $source_screenName) {
                    relationship {
                        source {
                            id
                            screen_name
                            following
                        }
                        target {
                            id
                            screen_name
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

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //


