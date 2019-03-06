// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { Switch, Route, withRouter } from 'react-router-dom';

// Pages
import Home from '../pages/home/home';
import Main from '../pages/main/main';
import CallBack from '../components/callback';

// Auth0
import auth from '../auth';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

class RouteContainer extends Component {
    state = {
        tryingSilent: true
    };
    
    async componentDidMount() {
        if (this.props.location.pathname === '/callback') {
            this.setState({ tryingSilent: false });
            return;
        }
        
        try {
            await auth.silentAuth();
            this.setState({ tryingSilent: false });
            this.forceUpdate();
        } catch (err) {
            this.setState({ tryingSilent: false });
            if (err.error === 'login_required') return;
            console.log(err.error);
        }
    }

    render() {
        if (!this.state.tryingSilent) {
            return (
                <Switch>
                    <Route path='/main' component={Main} />
                    <Route path='/callback' render={props => <CallBack {...props} />} />
                    <Route path='/' component={Home} />
                </Switch>
            )
        }
        return 'loading';
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(RouteContainer);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
