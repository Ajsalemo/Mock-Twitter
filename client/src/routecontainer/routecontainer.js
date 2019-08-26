// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

// * Pages
import Home from '../pages/home/home';
import Main from '../pages/main/main';
import PublicProfile from '../pages/main/publicprofile';
import ProfileFollowing from '../pages/main/profilefollowing';
import ProfileFollowers from '../pages/main/profilefollowers';
import ProfileLikes from '../pages/main/profilelikes';
import PublicProfileLists from '../pages/main/publicprofilelists';
import ListsTimeline from '../pages/main/liststimeline';
import NotFound from '../pages/main/notfound';

// * Components
import Loading from '../components/loading';

// * Firebase
import firebaseClass from '../helpers/firebase';
import SearchPage from '../pages/main/searchpage';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class RouteContainer extends Component {
    async componentDidMount() {
        // * When the routes mount - push the authenicated user to the home page
        // * Else if the user is unAuthenticated(i.e, logs out) - push them to the log in page
        await firebaseClass.firebaseAuth().onAuthStateChanged(user => {
            if(user && this.props.location.pathname === '/') {
                this.props.history.push('/main');
            } else if(!user) {
                this.props.history.push('/');
            }
        });
        // * If the page hard refreshes, it pushes it to a loading indicator page
        // * Which then pushes back to the previous page, unless the route is the log in route
        if(window.location.reload && this.props.location.pathname !== '/') {
            this.props.history.push('/loading');
        }

        firebaseClass.firebaseAuth().getRedirectResult().then(result => {
            if(result.credential) {
                const token = result.credential.accessToken;
                localStorage.setItem('access_token', token);
                const secret = result.credential.secret;
                localStorage.setItem('access_secret', secret);
            }
        }).catch(error => {
            const errorMessage = error.message;
            console.log(errorMessage)
            return errorMessage;
        });
    };

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path='/search/:params' component={SearchPage} />
                    <Route path='/lists-statuses/:screen_name/:params' component={ListsTimeline} />
                    <Route path='/lists/:params' component={PublicProfileLists} />
                    <Route path='/likes/:params' component={ProfileLikes} />
                    <Route path='/userprofile/:params' component={PublicProfile} />
                    <Route path='/following/:params' component={ProfileFollowing} />
                    <Route path='/followers/:params' component={ProfileFollowers} />
                    <Route exact path='/main' component={Main} />
                    <Route exact path='/loading' component={Loading} />
                    <Route exact path='/' component={Home} />
                    {/* // * This renders a 404 page if none of the above routes match */}
                    <Route component={NotFound} />
                </Switch>
            </React.Fragment>
        );
    }
};

// ----------------------------------------------------------------------------------------------------- //

export default withRouter(RouteContainer);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
