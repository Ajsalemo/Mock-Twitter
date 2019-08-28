// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

require('dotenv').config();
const { ApolloServer } = require('apollo-server');
const admin = require('firebase-admin');
const { typeDefs, resolvers } = require('./schema');

// ----------------------------------------------------------------------------------------------------- //

admin.initializeApp({
    credential: admin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        privateKey: process.env.FIREBASE_PRIVATE_KEY,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
    }),
    databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

// ! This function returns the user provided by firebase
// ! The token is added to the authorization headers by the client in 'apolloclient.js'
// ! The server request is passed in as a parameter, which is added when this function is called in Apollos Context
const getUid = async (req) => {
    // * If headers exists, set idToken to that value - else it returns null if it doesn't exist
    let idToken = (req.headers && req.headers.authorization) ? req.headers.authorization : null;
    // * Throw an error message if a token isn't found
    if (!idToken) {
        console.log('No token found');
        return null;
    }
    const newToken = idToken.split('Bearer ')[1];
    // * Firebase SDK admin is called here to use its method to verify the token
    let user = await admin.auth().verifyIdToken(newToken)
        .then(decodedToken => {
            // ! Pulling twitters access_token, access_secret and the decoded user off of the headers
            const decodedInformation = {
                access_token: req.headers.access_token,
                access_secret: req.headers.access_secret,
                decodedToken: decodedToken
            }
            return decodedInformation;
        }).catch(err => {
            console.log(err)
            return err;
        });
    return user;
};

const server = new ApolloServer({
    typeDefs,
    resolvers,
    formatError: error => {
        console.log(error);
        return new Error('Internal server error');
    },
    context: ({ req }) => {
        const user = getUid(req);
        return user;
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const PORT = process.env.PORT || 4000;

server.listen({ port: PORT }).then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
