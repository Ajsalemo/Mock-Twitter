// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from 'react-router-dom';

// Apollo Client
import { client } from './apolloclient/apolloclient';

// Material-UI components
import CssBaseline from '@material-ui/core/CssBaseline';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

ReactDOM.render(
    <ApolloProvider client={client}>
        <Router>
            <CssBaseline>
                <App />
            </CssBaseline>
        </Router>
    </ApolloProvider>, 
    document.getElementById('root')
);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

serviceWorker.unregister();

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

