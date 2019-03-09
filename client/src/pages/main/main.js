// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';

// Components
import Navbar from '../../components/navbar';
import ProfileHandle from '../../components/profilehandle';
import Grid from '@material-ui/core/Grid';
import SubmitTweet from '../../components/submittweet';
import Recommended from '../../components/recommended';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    containerStyle: {
        marginTop: '3.5em',
        justifyContent: 'center'
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
                    <ProfileHandle />
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