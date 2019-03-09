// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from '../pages/home/home';
import Main from '../pages/main/main';
import CallBack from '../components/callback';

// Auth0
import auth from '../auth';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class RouteContainer extends Component  {
    async componentDidMount() {
        if (this.props.location.pathname === '/callback') return;
        try {
            await auth.silentAuth();
            this.forceUpdate();
        } catch (err) {
            if (err.error === 'login_required') return;
            console.log(err.error);
        }
    }

    render() {
        return (
            <React.Fragment>
                <Switch>
                    <Route path='/main' component={Main} />
                    <Route path='/callback' component={CallBack} />
                    <Route path='/' component={Home} />
                </Switch>
            </React.Fragment>
        )
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(RouteContainer);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
