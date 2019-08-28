// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import ApolloClient from 'apollo-boost'
import { InMemoryCache } from 'apollo-cache-inmemory';
import { persistCache } from 'apollo-cache-persist';

// * Firebase
import firebaseClass from '../helpers/firebase';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const cache = new InMemoryCache();

// * This keeps Apollo queries or mutations in memory(local storage) through hard refreshes or state changes
persistCache({
  cache,
  storage: window.localStorage,
});
export const client = new ApolloClient({
  uri: process.env.REACT_APP_APOLLO_URI,
  // * When Apollo encounters an error, this will log it in the browser console
  onError: ({ networkError, graphQLErrors }) => {
    console.log('graphQLErrors', graphQLErrors)
    console.log('networkError', networkError)
  },
  cache,
  request: async operation => {
    // * Create variables for the tokens to be sent across the request headers
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
// ----------------------------------------------------------------------------------------------------- //
