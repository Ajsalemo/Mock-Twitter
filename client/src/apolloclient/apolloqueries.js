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
// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

