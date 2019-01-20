// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import auth0 from 'auth0-js';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
export default class Auth {
    auth0 = new auth0.WebAuth({
        domain: `${process.env.REACT_APP_AUTH0_DOMAIN}`,
        clientID: `${process.env.REACT_APP_AUTH0_CLIENT_ID}`,
        redirectUri: 'http://localhost:3000/callback',
        audience: `${process.env.REACT_APP_AUTH0_API_IDENTIFIER}`,
        responseType: 'token id_token',
        scope: 'openid profile email'
    });

    handleAuthentication = cb => {
        this.auth0.parseHash({hash: window.location.hash}, (err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.auth0.client.userInfo(authResult.accessToken, (err, profile) => {
                    this.storeAuth0Cred(authResult, profile);
                    cb(false, {...authResult, ...profile})
                });
            } else if (err) {
                console.log(err);
                cb(true, err)
            }
        });
    }

    storeAuth0Cred = (authResult, profile) => {
    // Set the time that the access token will expire at
    let expiresAt = JSON.stringify(
        authResult.expiresIn * 1000 + new Date().getTime()
    );
        localStorage.setItem('mock_twitter_access_token', authResult.accessToken);
        localStorage.setItem('mock_twitter_id_token', authResult.idToken);
        localStorage.setItem('mock_twitter_expires_at', expiresAt);
        localStorage.setItem('mock_twitter_profile', JSON.stringify(profile));
    }

    storeGraphCoolCred = authResult => {
        localStorage.setItem('mock_twitter_gcool_token', authResult.token);
        localStorage.setItem('mock_twitter_gcool_id', authResult.id);
    }

    login = () => {
        this.auth0.authorize();
    }

    logout = history => {
        // Clear access token and ID token from local storage
        localStorage.removeItem('mock_twitter_access_token');
        localStorage.removeItem('mock_twitter_id_token');
        localStorage.removeItem('mock_twitter_expires_at');
        localStorage.removeItem('mock_twitter_profile');
        localStorage.removeItem('mock_twitter_gcool_token');
        localStorage.removeItem('mock_twitter_gcool_id');
        // navigate to the home route
        history.replace('/');
    }

    isAuthenticated = () => {
        // Check whether the current time is past the
        // access token's expiry time
        const expiresAt = JSON.parse(localStorage.getItem('mock_twitter_expires_at'));
        return new Date().getTime() < expiresAt;
    }

    getProfile = () => {
        return JSON.parse(localStorage.getItem('mock_twitter_profile'));
    }
}