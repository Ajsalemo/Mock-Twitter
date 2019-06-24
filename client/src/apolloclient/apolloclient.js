// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';
import firebaseClass from '../firebase';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const cache = new InMemoryCache();

persistCache({
  cache,
  storage: window.localStorage,
});

export const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URI,
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
  cache,
  request: async operation => {
    const firebaseToken = await firebaseClass.getTokenForValidation();
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: firebaseToken ? `Bearer ${firebaseToken}` : null
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
