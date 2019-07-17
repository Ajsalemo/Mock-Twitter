// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import PublicProfileBanner from '../../components/publicprofilebanner';
import ProfileBannerBar from '../../components/profilebannerbar';
import PublicProfileHandle from '../../components/publicprofilehandle';
import Recommended from '../../components/recommended';
import Trending from '../../components/trending';
import Error from '../../components/error';
import PublicProfileTimeline from '../../components/publicprofiletimeline';

// Apollo Query
import { SHOW_USER, VERIFY_USER } from '../../apolloclient/apolloqueries';

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

let PublicProfile = props => {
    const param = props.match.params.params; 
    const { classes } = props;
    return (
        <Query
            query={SHOW_USER}
            variables={{
                screen_name: param
            }}
        >
            {({ loading: loadingOne, error: errorOne, data: one }) => (
                <Query
                    query={VERIFY_USER}
                >
                    {({ loading: loadingTwo, error: errorTwo, data: two }) => {
                        if (loadingOne || loadingTwo) return <div><CircularProgress /></div>;
                        if (errorOne || errorTwo) return <div><Error /></div>;
                        return (
                            <React.Fragment>
                                <Navbar 
                                    profileLinkColor={one.currentUser.showUser.profile_link_color}
                                    avatarImg={two.currentUser.verifyCredentials.profile_image_url_https}
                                    name={two.currentUser.verifyCredentials.name}
                                    screenName={two.currentUser.verifyCredentials.screen_name}
                                /> 
                                <PublicProfileBanner
                                    URLparam={param}
                                    profileLinkColor={one.currentUser.showUser.profileLinkColor}
                                    profileBannerURL={one.currentUser.showUser.profile_banner_url}
                                />
                                <ProfileBannerBar 
                                    URLparam={param}
                                    screenName={one.currentUser.showUser.screen_name}
                                    statusCount={one.currentUser.showUser.statuses_count}
                                    friendsCount={one.currentUser.showUser.friends_count}
                                    followersCount={one.currentUser.showUser.followers_count}
                                    favouritesCount={one.currentUser.showUser.favourites_count}
                                    tweetUserId={one.currentUser.showUser.id}
                                    profileLinkColor={one.currentUser.showUser.profile_link_color}
                                    currentUser={two.currentUser.verifyCredentials.screen_name}
                                    avatarImg={one.currentUser.showUser.profile_image_url_https}
                                />
                                <Grid container className={classes.publicProfileContainerStyle}>
                                    <Grid item xs={8} sm={8} md={2} className={classes.publicProfileHandlerGrid}>
                                        <PublicProfileHandle 
                                            URLparam={param}
                                            currentUser={two.currentUser.verifyCredentials.screen_name}
                                            screenName={one.currentUser.showUser.screen_name}
                                            verified={one.currentUser.showUser.verified}
                                            description={one.currentUser.showUser.description}
                                            createdAt={one.currentUser.showUser.created_at}
                                            name={one.currentUser.showUser.name}
                                            profileLinkColor={one.currentUser.showUser.profile_link_color}
                                            avatarImg={two.currentUser.verifyCredentials.profile_image_url_https}
                                        />
                                    </Grid>
                                    <Grid item md={4} className={classes.publicProfileTimelineItem}>
                                        <PublicProfileTimeline
                                            screenName={one.currentUser.showUser.screen_name}
                                            profileLinkColor={one.currentUser.showUser.profile_link_color}
                                        />
                                    </Grid>
                                    <Grid item md={2}>
                                        <Recommended />
                                        <Trending 
                                            profileLinkColor={one.currentUser.showUser.profile_link_color}
                                        />
                                    </Grid>
                                </Grid>
                            </React.Fragment>
                        );
                    }}
                </Query>
            )}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

PublicProfile = withStyles(styles)(PublicProfile);

export default withRouter(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
