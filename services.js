// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { ApolloServer } = require('apollo-server-express');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// Schema
const { typeDefs, resolvers } = require('./schema');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const client = jwksClient({
    jwksUri: `reacttwitter.auth0.com/.well-known/jwks.json`
});

const options = {
    audience: `reacttwitter.auth0.com`,
    issuer: `reacttwitter.auth0.com`,
    algorithms: ['RS256']
};

// ----------------------------------------------------------------------------------------------------- //

const getKey = (header, cb) => {
    client.getSigningKey(header.kid, () => (err, key) => {
        let signingKey = key.publicKey || key.rsaPublicKey;
        cb(null, signingKey);
    });
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    context: ({ req }) => {
      const token = req.headers.authorization;
      const user = new Promise((resolve, reject) => {
        jwt.verify(token, getKey, options, (err, decoded) => {
          if(err) {
            return reject(err);
          }
          resolve(decoded.email);
        });
        
      });
      return {
        user
      };
    },
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

module.exports = server;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
