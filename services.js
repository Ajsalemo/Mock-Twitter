// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { ApolloServer } = require('apollo-server');
const jwt = require('jsonwebtoken');
const jwksClient = require('jwks-rsa');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const client = jwksClient({
    jwksUri: `${process.env.REACT_APP_AUTH0_DOMAIN}/.well-known/jwks.json`
});

const options = {
    audience: `${process.env.REACT_APP_CLIENT_ID}`,
    issuer: `${process.env.REACT_APP_AUTH0_DOMAIN}/`,
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
    resolvers,
    context: ({ req }) => {
      // simple auth check on every request
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