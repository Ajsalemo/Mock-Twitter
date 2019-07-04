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
        paddingRight: '2em',
        marginLeft: '10em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let ProfileFollowing = props => {
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
                currentUser={param}
            />
            <Grid container className={classes.publicProfileContainerStyle}>
                <Grid item xs={8} sm={8} md={2} className={classes.publicProfileHandlerGrid}>
                    <PublicProfileHandle 
                        URLparam={param}
                    />
                    <Trending />
                </Grid>
                    <Grid item md={7}>
                        <UsersFollowingList
                            // With this component - param is the screename passed through the URL, which can be dynamic, i.e - changing it to any screen name 
                            currentUser={param}
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
