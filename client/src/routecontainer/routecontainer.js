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

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class RouteContainer extends Component  {
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
