// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
require('dotenv').config();
const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema');
const cors = require('cors');

// Apollo server
const server = require('./services');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const app = express();
server.applyMiddleware({ app });

// ----------------------------------------------------------------------------------------------------- //

app.use('/graphql', graphqlHTTP({
    schema,
    graphiql: true
}));

const PORT = process.env.PORT || 4000;

app.listen(PORT, () => console.log(`Server is listening on PORT: ${PORT}`));

// ----------------------------------------------------------------------------------------------------- //
