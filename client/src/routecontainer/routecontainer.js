// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from '../pages/home/home';
import Main from '../pages/main/main';
import PublicProfile from '../pages/main/publicprofile';
import ProfileFollowing from '../pages/main/profilefollowing';
import ProfileFollowers from '../pages/main/profilefollowers';
import ProfileLikes from '../pages/main/profilelikes';
import PublicProfileLists from '../pages/main/publicprofilelists';
import ListsTimeline from '../pages/main/liststimeline';

// Components
import Loading from '../components/loading';

// Firebase
import firebaseClass from '../firebase';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class RouteContainer extends Component {
    async componentDidMount() {
        // When the routes mount - push the authenicated user to the home page
        // Else if the user is unAuthenticated(i.e, logs out) - push them to the log in page
        await firebaseClass.firebaseAuth().onAuthStateChanged(user => {
            if(user && this.props.location.pathname === '/') {
                this.props.history.push('/main');
            } else if(!user) {
                this.props.history.push('/');
            }
        });
        // Work around to prevent the getTokenId method on the firebase constructor from becoming null
        // If the page hard refreshes, it pushes it to a loading indicator page
        // Which then pushes back to the previous page, unless the route is the log in route
        if(window.location.reload && this.props.location.pathname !== '/') {
            this.props.history.push('/loading');
        }
    };

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path='/lists-statuses' component={ListsTimeline} />
                    <Route path='/lists/:params' component={PublicProfileLists} />
                    <Route path='/likes/:params' component={ProfileLikes} />
                    <Route path='/userprofile/:params' component={PublicProfile} />
                    <Route path='/following/:params' component={ProfileFollowing} />
                    <Route path='/followers/:params' component={ProfileFollowers} />
                    <Route path='/main' component={Main} />
                    <Route path='/loading' component={Loading} />
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
