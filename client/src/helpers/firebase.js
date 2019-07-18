// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

// const firebase = require('firebase');
import * as firebase from 'firebase/app';
import 'firebase/auth';

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

    // Returns Twitters Access Token Key
    getAccessToken = token => {
        return token;
    }

    // Returns Twitters Access Token Secret
    getAccessSecret = secret => {
        return secret;
    }

    // Retrieves a JWT token to be associated with the user
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

    // This function sets the persistence of the authenticated session
    // SESSION - lets the user stay authenticated through a page refresh
    // But will clear the users session if the tab or browser is closed
    persistAuthentication = () => {
        this.firebaseAuth().setPersistence(firebase.auth.Auth.Persistence.SESSION)
            .then(() => {
                // After setting persistance, call the log in popup
                return this.twitterSignIn();
            }).catch(err => {
                console.log(err);
            });
    }

    signOut = () => {
        // Clear out any history in local storage
        localStorage.clear();
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
