// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';

// Material-UI component
import { withStyles, CircularProgress, Typography, Grid } from '@material-ui/core';

// Firebase
import firebaseClass from '../firebase';

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

class Loading extends Component {
    async componentDidMount() {
        // If the user hard refreshes the page - it pushes them back to the previous page
        // Unless the page is the log in route
        // Else push the unAuthenticated user back to log in
        await firebaseClass.firebaseAuth().onAuthStateChanged(user => {
            if(user) {
                this.props.history.goBack();
            } else if(!user) {
                this.props.history.push('/');
            }
        });
    }

    render() {
        const { classes } = this.props;
        return (
            <Grid container direction='column' className={classes.gridContainer}>
                <Grid item xs={12} className={classes.gridItem}>
                    <CircularProgress />
                    <Typography variant='h6' className={classes.typography}>
                        Loading..
                    </Typography>
                </Grid>
            </Grid>
        );    
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Loading);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //