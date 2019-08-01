// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { ApolloProvider } from "react-apollo";
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'

// Redux
import { store, persistor } from './redux/store';

// Apollo Client
import { client } from './apolloclient/apolloclient';

// Material-UI components
import CssBaseline from '@material-ui/core/CssBaseline';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

ReactDOM.render(
    <ApolloProvider client={client}>
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <CssBaseline>
                        <App />
                    </CssBaseline>
                </Router>
            </PersistGate>
        </Provider>
    </ApolloProvider>, 
    document.getElementById('root')
);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

serviceWorker.unregister();

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

