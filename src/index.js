// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';

// Material-UI components
import CssBaseline from '@material-ui/core/CssBaseline';

// DOTENV
require('dotenv').config()

// ----------------------------------------------------------------------------------------------------- //

// Create connection link
const httpLink = new HttpLink({ uri: 'https://api.graph.cool/simple/v1/cjr3yyt7821ou0101kkklk0lv' });

// Configure client with link
const client = new ApolloClient({
    link: httpLink,
    cache: new InMemoryCache()
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

ReactDOM.render(
    <ApolloProvider client={client}>
        <CssBaseline>
            <App />
        </CssBaseline>
    </ApolloProvider>, 
    document.getElementById('root')
);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

serviceWorker.unregister();

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

