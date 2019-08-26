// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { connect } from 'react-redux';

// * Material-UI component
import { withStyles, CircularProgress, Typography, Grid } from '@material-ui/core';

// * Firebase
import firebaseClass from '../helpers/firebase';

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
        // * If the user hard refreshes the page - it pushes them back to the previous page
        // * Unless the page is the log in route
        // * Else push the unAuthenticated user back to log in
        await firebaseClass.firebaseAuth().onAuthStateChanged(user => {
            if(user && this.props.location.pathname !== '/') {
                this.props.history.goBack();
            } else if(!user) {
                this.props.history.push('/');
            }
        });
    };

    render() {
        const { classes, dark_mode } = this.props;
        return (
            <Grid container direction='column' className={classes.gridContainer} style={{ backgroundColor: dark_mode ? '#000000e0' : null }}>
                <Grid item xs={12} className={classes.gridItem}>
                    <CircularProgress 
                        style={{ color: dark_mode ? '#fff' : null }}
                    />
                    <Typography variant='h6' className={classes.typography} style={{ color: dark_mode ? '#fff' : null }}>
                        Loading..
                    </Typography>
                </Grid>
            </Grid>
        );    
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    }
};

// ----------------------------------------------------------------------------------------------------- //

Loading = connect(
    mapStateToProps
)(Loading);

// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Loading);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //