// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage,
});

export const client = new ApolloClient({
  uri: "http://localhost:4000/graphql",
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
  cache,
  request: operation => {
    operation.setContext(context => ({
      headers: {
        ...context.headers
      }
    }));
  }
});

// ----------------------------------------------------------------------------------------------------- //
// Function to return the number of minute(s) before a Apollo Query poles again

export const pollMinute = (a, b) => {
  return a * b;
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
