// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';


// Components
import Navbar from '../../components/navbar';
import PublicProfileBanner from '../../components/publicprofilebanner';
import ProfileBannerBar from '../../components/profilebannerbar';
import ProfileHandle from '../../components/profilehandle';
import Recommended from '../../components/recommended';
import Trending from '../../components/trending';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicProfileContainerStyle: {
        marginTop: '0.7em',
        display: 'flex',
        justifyContent: 'space-around'
    },
    publicProfileHandlerGrid: {
        width: 'auto'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let PublicProfile = props => {
    const param = props.match.params.params; 
    const { classes } = props;
    return (
        <React.Fragment>
            <Navbar /> 
            <PublicProfileBanner
                URLparam={param}
            />
            <ProfileBannerBar />
            <Grid container className={classes.publicProfileContainerStyle}>
                <Grid item xs={8} sm={8} md={2} className={classes.publicProfileHandlerGrid}>
                    {/* This component is a place holder, for now */}
                    <ProfileHandle />
                </Grid>
                <Grid item>
                    <Recommended />
                    <Trending />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

PublicProfile = withStyles(styles)(PublicProfile);

export default withRouter(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
