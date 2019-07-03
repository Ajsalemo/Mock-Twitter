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
import Trending from '../../components/trending';
import UsersFollowingList from '../../components/usersfollowinglist';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicProfileContainerStyle: {
        marginTop: '0.7em',
        display: 'flex',
        justifyContent: 'center'
    },
    publicProfileHandlerGrid: {
        width: 'auto',
        paddingRight: '0em'
    },
    publicProfileTimelineItem: {
        marginRight: '0.6em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let ProfileFollowing = props => {
    const param = props.match.params.params; 
    console.log(param)
    const { classes } = props;
    return (
        <React.Fragment>
            <Navbar /> 
            <PublicProfileBanner
                URLparam={param}
            />
            <ProfileBannerBar 
                URLparam={param}
                currentUser={param}
            />
            <Grid container className={classes.publicProfileContainerStyle}>
                <Grid item xs={8} sm={8} md={2} className={classes.publicProfileHandlerGrid}>
                    <PublicProfileHandle 
                        URLparam={param}
                    />
                    <Trending />
                </Grid>
                <Grid item md={6} className={classes.publicProfileTimelineItem}>
                    <UsersFollowingList
                        screen_name={param}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

ProfileFollowing = withStyles(styles)(ProfileFollowing);

export default withRouter(ProfileFollowing);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
