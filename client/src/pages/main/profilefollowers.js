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
import UsersFollowersList from '../../components/usersfollowerslist';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicProfileFollowersContainerStyle: {
        marginTop: '0.7em',
        display: 'flex',
        justifyContent: 'center'
    },
    publicProfileFollowersHandlerGrid: {
        width: 'auto',
        paddingRight: '2em',
        marginLeft: '10em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let ProfileFollowers = props => {
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
            <Grid container className={classes.publicProfileFollowersContainerStyle}>
                <Grid item xs={8} sm={8} md={2} className={classes.publicProfileFollowersHandlerGrid}>
                    <PublicProfileHandle 
                        URLparam={param}
                    />
                    <Trending />
                </Grid>
                <Grid item md={7}>
                    <UsersFollowersList
                        currentUser={param}
                    />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

ProfileFollowers = withStyles(styles)(ProfileFollowers);

export default withRouter(ProfileFollowers);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
