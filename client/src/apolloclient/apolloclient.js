// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import ApolloClient from "apollo-boost";
import { InMemoryCache } from 'apollo-cache-inmemory';

// Auth0
import auth from '../auth';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export const client = new ApolloClient({
    uri: 'http://localhost:4000/graphql',
    credentials: 'same-origin',
    cache: new InMemoryCache(),
    request: operation => {
        operation.setContext(context => ({
          headers: {
            ...context.headers,
            authorization: auth.getIdToken(),
          },
        }));
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
