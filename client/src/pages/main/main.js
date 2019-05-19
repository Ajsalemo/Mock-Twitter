// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Components
import Navbar from '../../components/navbar';
import ProfileHandle from '../../components/profilehandle';
import SubmitTweet from '../../components/submittweet';
import Recommended from '../../components/recommended';
import Trending from '../../components/trending';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    containerStyle: {
        marginTop: '3.5em',
        justifyContent: 'center'
    },
    profileHandlerGrid: {
        width: 'auto'
    }
});

// ----------------------------------------------------------------------------------------------------- //

class Main extends Component {
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Navbar />
                <Grid container className={classes.containerStyle}>
                    <Grid item xs={8} sm={8} md={2} className={classes.profileHandlerGrid}>
                        <ProfileHandle />
                        <Trending />
                    </Grid>
                    <SubmitTweet />
                    <Recommended />
                </Grid>
            </React.Fragment>
        )
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(withStyles(styles)(Main));

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //