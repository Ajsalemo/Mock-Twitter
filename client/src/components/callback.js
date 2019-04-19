// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Material-UI component
import { withStyles } from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import { Grid } from '@material-ui/core';

// Auth0
import auth from '../auth';

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
    async componentDidMount() {
        await auth.handleAuthentication();
        this.props.history.replace('/main');
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
        );
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

let Callback = withStyles(styles)(CallBack);

export default withRouter(Callback);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //