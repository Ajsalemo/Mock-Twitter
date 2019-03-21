// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import { gql } from "apollo-boost";

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

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
                }
            }
        }
    `;
// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

