// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const firebase = require('firebase');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const firebaseConfig = {
    apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
    authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseURL: process.env.REACT_APP_REACT_APP_FIREBASE_DATABASE_URL,
    projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket: "",
    messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID
};

// ----------------------------------------------------------------------------------------------------- //

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// ----------------------------------------------------------------------------------------------------- //

const provider = new firebase.auth.TwitterAuthProvider();

class FirebaseHelperClass {
    constructor() {
        this.twitterSignIn = this.twitterSignIn.bind(this);
        this.firebaseAuth = this.firebaseAuth.bind(this);
        this.signOut = this.signOut.bind(this);
        this.persistAuthentication = this.persistAuthentication.bind(this);
        this.getAccessToken = this.getAccessToken.bind(this);
        this.getAccessSecret = this.getAccessSecret.bind(this);
    }

    firebaseAuth = () => {
        return firebase.auth();
    };

    twitterSignIn = () => {
        this.firebaseAuth().signInWithPopup(provider)
            .then(result => {
                // This gives you a the Twitter OAuth 1.0 Access Token and Secret.
                // You can use these server side with your app's credentials to access the Twitter API.
                const token = result.credential.accessToken;
                localStorage.setItem('access_token', token)
                const secret = result.credential.secret;
                localStorage.setItem('access_secret', secret)
            }).catch(function (error) {
                const errorMessage = error.message;
                console.log(errorMessage)
                return errorMessage;
            });
    };

    getAccessToken = token => {
        return token;
    }

    getAccessSecret = secret => {
        return secret;
    }

    getTokenForValidation = () => {
        const verifyToken = this.firebaseAuth().currentUser.getIdToken()
            .then(idToken => {
                return idToken;
            }).catch(err => {
                // Handle error
                console.log(err);
            });
            return verifyToken;
    };

    persistAuthentication = () => {
        this.firebaseAuth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                return this.twitterSignIn();
            }).catch(err => {
                console.log(err);
            });
    }

    signOut = () => {
        this.firebaseAuth().signOut();
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const firebaseClass = new FirebaseHelperClass();

// ----------------------------------------------------------------------------------------------------- //

export default firebaseClass;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
