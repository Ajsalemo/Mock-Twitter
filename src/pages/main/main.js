// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

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

const Main = props => {
    const { classes } = props;
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
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Main);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //