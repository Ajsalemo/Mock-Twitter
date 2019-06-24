// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from '../pages/home/home';
import Main from '../pages/main/main';
import PublicProfile from '../pages/main/publicprofile';

// Components
import Loading from '../components/loading';
import CallBack from '../components/callback';

// Firebase
import firebaseClass from '../firebase';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class RouteContainer extends Component {
    async componentDidMount() {
        await firebaseClass.firebaseAuth().onAuthStateChanged(user => {
            if (user) {
                // User is signed in.
                console.log(user)
                this.props.history.push('/callback');
            } else {
                // No user is signed in.
                this.props.history.push('/');
            }
        });
    };

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path='/userprofile/:params' component={PublicProfile} />
                    <Route path='/userprofile/tweets/:params' />
                    <Route path='/main' component={Main} />
                    <Route path='/callback' component={CallBack} />
                    <Route path='/' component={Home} />
                </Switch>
            </React.Fragment>
        );
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(RouteContainer);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
