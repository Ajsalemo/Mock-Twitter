// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

// Firebase
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
    const twitter_token = window.localStorage.getItem('access_token');
    const twitter_secret = window.localStorage.getItem('access_secret');
    const firebaseToken = await firebaseClass.getTokenForValidation();
    const twitterAccessToken = await firebaseClass.getAccessToken(twitter_token);
    const twitterAccessSecret = await firebaseClass.getAccessToken(twitter_secret);
    operation.setContext(context => ({
      headers: {
        ...context.headers,
        authorization: firebaseToken ? `Bearer ${firebaseToken}` : null,
        'access_token': twitterAccessToken ? twitterAccessToken : null,
        'access_secret': twitterAccessSecret ? twitterAccessSecret : null
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
