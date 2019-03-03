// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "react-apollo";

// Apollo Client
import { client } from './apolloclient/apolloclient';

// Material-UI components
import CssBaseline from '@material-ui/core/CssBaseline';


// DOTENV
require('dotenv').config()

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

