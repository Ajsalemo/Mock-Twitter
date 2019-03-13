// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');
const { typeDefs, resolvers } = require('../schema');

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
                console.log(JSON.stringify(decoded))
            });
        });
        return user;
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
