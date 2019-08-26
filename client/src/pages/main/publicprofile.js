// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// * Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// * Components
import Navbar from '../../components/navbar';
import PublicProfileBanner from '../../components/publicprofilebanner';
import ProfileBannerBar from '../../components/profilebannerbar';
import PublicProfileHandle from '../../components/publicprofilehandle';
import Trending from '../../components/trending';
import PublicProfileTimeline from '../../components/publicprofiletimeline';

// * Pages
import NotFound from './notfound';

// * Apollo Query
import { SHOW_USER, VERIFY_USER } from '../../apolloclient/apolloqueries';

// * Helper function
import { changeGridBackground, fontColorChange, changeComponentBackground, changeBorder } from '../../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    publicProfileContainerStyle: {
        paddingTop: '0.7em',
        display: 'flex',
        justifyContent: 'center'
    },
    publicProfileHandlerGrid: {
        width: 'auto',
        paddingRight: '0em'
    },
    publicProfileTimelineItem: {
        padding: '0.6em',
        [theme.breakpoints.up('sm')]: {
            marginRight: '0.6em',
            padding: '0em 0em 4em 0.5em'
        }
    },
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    },
    trendingGrid: {
        marginTop: '-1em',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'initial'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

let PublicProfile = props => {
    const param = props.match.params.params; 
    const { classes, dark_mode } = props;
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
                        if (loadingOne || loadingTwo) return <div className={classes.errorAndLoadingDiv} style={{ backgroundColor: changeGridBackground(dark_mode) }}><CircularProgress /></div>;
                        if (errorOne || errorTwo) return <NotFound />;
                        return (
                            <React.Fragment>
                                <Navbar 
                                    profileLinkColor={one.currentUser.showUser.profile_link_color}
                                    avatarImg={two.currentUser.verifyCredentials.profile_image_url_https}
                                    name={two.currentUser.verifyCredentials.name}
                                    screenName={two.currentUser.verifyCredentials.screen_name}
                                    darkModeStatus={dark_mode}
                                    darkModeBorder={changeBorder(dark_mode)}
                                    darkModeFont={fontColorChange(dark_mode)}
                                    darkModeComponentBackground={changeComponentBackground(dark_mode)}        
                                /> 
                                <PublicProfileBanner
                                    URLparam={param}
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
                                    darkModeBorder={changeBorder(dark_mode)}
                                    darkModeFont={fontColorChange(dark_mode)}
                                    darkModeComponentBackground={changeComponentBackground(dark_mode)}        
                                />
                                <Grid container className={classes.publicProfileContainerStyle} style={{ backgroundColor: changeGridBackground(dark_mode) }}>
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
                                            darkModeFont={fontColorChange(dark_mode)}        
                                        />
                                    </Grid>
                                    <Grid item md={4} className={classes.publicProfileTimelineItem}>
                                        <PublicProfileTimeline
                                            screenName={one.currentUser.showUser.screen_name}
                                            profileLinkColor={one.currentUser.showUser.profile_link_color}
                                            darkModeBorder={changeBorder(dark_mode)}
                                            darkModeFont={fontColorChange(dark_mode)}
                                            darkModeComponentBackground={changeComponentBackground(dark_mode)}        
                                        />
                                    </Grid>
                                    <Grid item md={2} className={classes.trendingGrid}>
                                        <Trending 
                                            profileLinkColor={one.currentUser.showUser.profile_link_color}
                                            darkModeBorder={changeBorder(dark_mode)}
                                            darkModeFont={fontColorChange(dark_mode)}
                                            darkModeComponentBackground={changeComponentBackground(dark_mode)}        
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

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    };
};

// ----------------------------------------------------------------------------------------------------- //

PublicProfile = connect(
    mapStateToProps
)(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //

PublicProfile = withStyles(styles)(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
