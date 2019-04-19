// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter, Switch, Route } from 'react-router-dom';

// Pages
import Home from '../pages/home/home';
import Main from '../pages/main/main';

// Components
import Loading from '../components/loading';
import CallBack from '../components/callback';

// Auth0
import auth from '../auth';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class RouteContainer extends Component  {
    state = {
        tryingSilent: true
    };

    // If the path is the 'Callback' component, then this function will return nothing/no changes
    // Else, if it's not - I.E just mounting, or a page refresh - refetch the authentication state
    async componentDidMount() {
        if (this.props.location.pathname === '/callback') {
            this.setState({ 
                tryingSilent: false 
            });
            return;
        }
        try {
            await auth.silentAuth();
            this.setState({ 
                tryingSilent: false 
            });
            this.forceUpdate();
        } catch (err) {
            this.setState({ 
                tryingSilent: false 
            });
            if (err.error === 'login_required') return;
            console.log(err.error);
        }
    }

    render() {
        if (!this.state.tryingSilent) {
            return (
                <React.Fragment>
                    <Switch>
                        <Route path='/main' component={Main} />
                        <Route path='/callback' component={CallBack} />
                        <Route path='/' component={Home} />
                    </Switch>
                </React.Fragment>
            );
        }
        return <Loading />;
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(RouteContainer);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
