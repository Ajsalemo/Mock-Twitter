// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router';

// Material-UI components
import { withStyles, Grid } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import PublicProfileBanner from '../../components/publicprofilebanner';
import ProfileBannerBar from '../../components/profilebannerbar';
import PublicProfileHandle from '../../components/publicprofilehandle';
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
        width: 'auto',
        paddingRight: '0em'
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
            <ProfileBannerBar 
                URLparam={param}
            />
            <Grid container className={classes.publicProfileContainerStyle}>
                <Grid item xs={8} sm={8} md={2} className={classes.publicProfileHandlerGrid}>
                    {/* This component is a place holder, for now */}
                    <PublicProfileHandle 
                        URLparam={param}
                    />
                </Grid>
                <Grid item md={2}>
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
