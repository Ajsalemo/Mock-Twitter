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

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //


