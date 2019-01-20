// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { graphql } from 'react-apollo';
import gql from 'graphql-tag';

// Material-UI component
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

// Auth
import Auth from '../services/auth'
const auth = new Auth();

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    gridContainer: {
        height: '100vh'
    },
    gridItem: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    typography: {
        paddingLeft: '1em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

class CallBack extends Component {
    componentDidMount = () => {
        auth.handleAuthentication(async (err, authResult) => {
            if (err) this.props.history.push('/');
            // Send mutation to Graphcool with idToken
            // as the accessToken
            const result = await this.props.authMutation({
              variables: {
                accessToken: authResult.idToken
              }
            });
            // Save response to localStorage
            auth.storeGraphCoolCred(result.data.authenticateUser);
            // Redirect to profile page
            this.props.history.push('/main');
          });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container direction='column' className={classes.gridContainer}>
                <Grid item xs={12} className={classes.gridItem}>
                    <CircularProgress />
                    <Typography variant='h6' className={classes.typography}>
                        Redirecting..
                    </Typography>
                </Grid>
            </Grid>
        )
    }
};

// ----------------------------------------------------------------------------------------------------- //
// Mutation query
const AUTH_MUTATION = gql`
        mutation authMutation($accessToken: String!) {
            authenticateUser(accessToken: $accessToken) {
                id
                token
        }
    }
`;
// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

CallBack = withStyles(
    styles
)(CallBack);

export default graphql(AUTH_MUTATION, { name: 'authMutation' })(CallBack);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //