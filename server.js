// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { typeDefs, resolvers } = require('./schema');

// ----------------------------------------------------------------------------------------------------- //

const PORT = 4000;
const app = express();

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
const options = {
    audience: `${process.env.REACT_APP_CLIENT_ID}`,
    issuer: `https://${process.env.REACT_APP_DOMAIN}/`,
    algorithms: ['RS256']
};

const client = jwksClient({
    jwksUri: `https://${process.env.REACT_APP_DOMAIN}/.well-known/jwks.json`
});

const getKey = (header, cb) => {
    client.getSigningKey(header.kid, (err, key) => {
        const signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
};


const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
        // simple auth check on every request
        const token = req.headers.authorization;
        const user = new Promise((resolve, reject) => {
            jwt.verify(token, getKey, options, (err, decoded) => {
                if (err) {
                    return reject(err);
                }
                resolve(decoded);
            });
        });
        return user;
    }
});
app.use(cors())
server.applyMiddleware({ app });

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

app.listen({ port: PORT }, () =>
  console.log(
    `🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`
  )
);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
