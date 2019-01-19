// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import ApolloClient from "apollo-boost";
import { ApolloProvider } from "react-apollo";
import * as serviceWorker from './serviceWorker';

// Material-UI components
import CssBaseline from '@material-ui/core/CssBaseline';

// DOTENV
require('dotenv').config()

// ----------------------------------------------------------------------------------------------------- //
// Instantiating the Apollo client
const client = new ApolloClient({
    uri: 'http://localhost:3000/'
})

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

