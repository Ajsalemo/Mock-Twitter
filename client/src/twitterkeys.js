// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const Twitter = require('twitter');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const Client = new Twitter({
    consumer_key: `${process.env.REACT_APP_CLIENT_ID}`,
    consumer_secret: `${process.env.REACT_APP_CLIENT_SECRET}`,
    access_token_key: `${process.env.REACT_APP_ACCESS_KEY}`,
    access_token_secret: `${process.env.REACT_APP_ACCESS_SECRET}`
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

module.exports = Client;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //