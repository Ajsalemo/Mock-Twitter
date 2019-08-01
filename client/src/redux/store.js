// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import { createStore, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

// Reducer
import rootReducer from './reducer';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const persistConfig = {
    key: 'root',
    storage
};

const persistedReducer = persistReducer(persistConfig, rootReducer);
const enhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

// ------------------------------------------------------------------------------------------------------- //

export let store = createStore(
    persistedReducer,
    enhancers()
);

export let persistor = persistStore(store);

// ------------------------------------------------------------------------------------------------------- //
// ------------------------------------------------------------------------------------------------------- //
