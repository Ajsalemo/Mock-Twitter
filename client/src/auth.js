// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import auth0 from 'auth0-js';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class Auth {
    constructor() {
      this.auth0 = new auth0.WebAuth({
        domain: `reacttwitter.auth0.com`,
        clientID: `wUrvnZ5bWgzuw6QbnDSYqszWlgtCUlL7`,
        redirectUri: 'http://localhost:3000/callback',
        audience: `https://reacttwitter.auth0.com/userinfo`,
        responseType: 'token id_token',
        scope: 'openid email',
      });
  
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.authFlag = 'isLoggedIn';
    }
  
    login() {
        this.auth0.authorize();
    }
  
    getIdToken() {
        return this.idToken;
    }
  
    handleAuthentication() {
        return new Promise((resolve, reject) => {
            this.auth0.parseHash((err, authResult) => {
                if (err) return reject(err);
                if (!authResult || !authResult.idToken) {
                    return reject(err);
                }
            this.setSession(authResult);
                resolve();
            });
        })
    }
  
    setSession(authResult) {
        this.idToken = authResult.idToken;
        // set the time that the id token will expire at
        this.expiresAt = authResult.expiresIn * 1000 + new Date().getTime();
        localStorage.setItem(this.authFlag, JSON.stringify(true)); 
    }
  
    logout() {
        localStorage.setItem(this.authFlag, JSON.stringify(false));
        this.auth0.logout({
            returnTo: 'http://localhost:3000/',
            clientID: `wUrvnZ5bWgzuw6QbnDSYqszWlgtCUlL7`,
        });
    }
  
    silentAuth() {
        if(this.isAuthenticated()) {
            return new Promise((resolve, reject) => {
                this.auth0.checkSession({}, (err, authResult) => {
                    if (err) {
                        localStorage.removeItem(this.authFlag);
                        return reject(err);
                    }
                    this.setSession(authResult);
                    resolve();
                });
            });
        }
    }
  
    isAuthenticated() {
        // Check whether the current time is past the token's expiry time
        return JSON.parse(localStorage.getItem(this.authFlag));
    }
  }

// ----------------------------------------------------------------------------------------------------- //

const auth = new Auth();

// ----------------------------------------------------------------------------------------------------- //

export default auth;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
