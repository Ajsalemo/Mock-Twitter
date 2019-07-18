// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import ProfileHandle from '../../components/profilehandle';
import SubmitTweet from '../../components/submittweet';
import Recommended from '../../components/recommended';
import Trending from '../../components/trending';
import Error from '../../components/error';

// Apollo Queries
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    containerStyle: {
        marginTop: '3.5em',
        justifyContent: 'center'
    },
    profileHandlerGrid: {
        width: 'auto'
    },
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Main = props => {
    const { classes } = props;
    return (
            <Query
                query={VERIFY_USER}
                fetchPolicy='network-only'
            >
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>
                if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>
                return (
                    <React.Fragment>
                        <Navbar 
                            avatarImg={data.currentUser.verifyCredentials.profile_image_url_https}
                            name={data.currentUser.verifyCredentials.name}
                            screenName={data.currentUser.verifyCredentials.screen_name}
                            profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                        />
                        <Grid container className={classes.containerStyle}>
                            <Grid item xs={8} sm={8} md={2} className={classes.profileHandlerGrid}>
                                <ProfileHandle 
                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                    profileBannerURL={data.currentUser.verifyCredentials.profile_banner_url}
                                    profileImage={data.currentUser.verifyCredentials.profile_image_url_https}
                                    screenName={data.currentUser.verifyCredentials.screen_name}
                                    name={data.currentUser.verifyCredentials.name}
                                    followersCount={data.currentUser.verifyCredentials.followers_count}
                                    friendsCount={data.currentUser.verifyCredentials.friends_count}
                                    statusCount={data.currentUser.verifyCredentials.statuses_count}
                                />
                                <Trending 
                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                />
                            </Grid>
                            <SubmitTweet 
                                avatarImg={data.currentUser.verifyCredentials.profile_image_url_https}
                                profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                screenName={data.currentUser.verifyCredentials.screen_name}
                            />
                            <Grid item xs={8} sm={8} md={2} className={classes.profileHandlerGrid}>
                                <Recommended />
                            </Grid>
                        </Grid>
                    </React.Fragment>
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(withStyles(styles)(Main));

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //