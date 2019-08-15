// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { withRouter } from 'react-router-dom';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// * Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// * Components
import Navbar from '../../components/navbar';
import ProfileHandle from '../../components/profilehandle';
import SubmitTweet from '../../components/submittweet';
import Trending from '../../components/trending';
import Error from '../../components/error';

// * Apollo Queries
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

// * Helper function
import { changeGridBackground, fontColorChange, changeComponentBackground, changeBorder } from '../../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    containerStyle: {
        paddingTop: '3.5em',
        justifyContent: 'center'
    },
    profileHandlerGrid: {
        width: 'auto',
        paddingBottom: '1em',
        [theme.breakpoints.between('sm', 'md')]: {
            paddingLeft: '1em'
        }
    },
    recommendedGrid: {
        width: 'auto',
        marginTop: '-1em',
        paddingBottom: '4em',
        [theme.breakpoints.between('sm', 'md')]: {
            paddingLeft: '1em'
        }
    },
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let Main = props => {
    const { classes, dark_mode } = props;
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
                            darkModeStatus={dark_mode}
                            darkModeBorder={changeBorder(dark_mode)}
                            darkModeFont={fontColorChange(dark_mode)}
                            darkModeComponentBackground={changeComponentBackground(dark_mode)}
                        />
                        <Grid 
                            container 
                            className={classes.containerStyle}
                            // ! Inline styles are used for dark mode
                            style={{ backgroundColor: changeGridBackground(dark_mode) }}
                        >
                            <Grid item xs={11} sm={4} md={2} className={classes.profileHandlerGrid}>
                                <ProfileHandle 
                                    darkModeBorder={changeBorder(dark_mode)}
                                    darkModeFont={fontColorChange(dark_mode)}
                                    darkModeComponentBackground={changeComponentBackground(dark_mode)}
                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                    profileBannerURL={data.currentUser.verifyCredentials.profile_banner_url}
                                    profileImage={data.currentUser.verifyCredentials.profile_image_url_https}
                                    screenName={data.currentUser.verifyCredentials.screen_name}
                                    name={data.currentUser.verifyCredentials.name}
                                    followersCount={data.currentUser.verifyCredentials.followers_count}
                                    friendsCount={data.currentUser.verifyCredentials.friends_count}
                                    statusCount={data.currentUser.verifyCredentials.statuses_count}
                                />
                            </Grid>
                            <SubmitTweet 
                                avatarImg={data.currentUser.verifyCredentials.profile_image_url_https}
                                profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                screenName={data.currentUser.verifyCredentials.screen_name}
                                darkModeStatus={dark_mode}
                                darkModeBorder={changeBorder(dark_mode)}
                                darkModeFont={fontColorChange(dark_mode)}
                                darkModeComponentBackground={changeComponentBackground(dark_mode)}
                            />
                            <Grid item xs={11} sm={4} md={2} className={classes.recommendedGrid}>
                                <Trending 
                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
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
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    }
};

// ----------------------------------------------------------------------------------------------------- //

Main = connect(
    mapStateToProps
)(Main);

// ----------------------------------------------------------------------------------------------------- //

export default withRouter(withStyles(styles)(Main));

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //