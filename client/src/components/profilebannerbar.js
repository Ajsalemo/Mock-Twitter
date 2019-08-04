// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// * Material-UI components
import { Avatar, Grid, AppBar, Toolbar, Typography, CircularProgress, withStyles } from '@material-ui/core';

// * Apollo Queries
import { GET_USER_LISTS } from '../apolloclient/apolloqueries';

// * Components
import Error from '../components/error';
import TooltipFollowButton from '../components/tooltipfollowbutton';

// * Helper function
import { extractAndReplaceNormalJPG } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    bannerBarPlacement: {
        marginTop: '-0.3em',
        height: '4em'
    },
    avatarBannerGrid: {
        display: 'flex',
        flexBasis: '30%',
        justifyContent: 'flex-end',
        marginTop: '-4.5em'
    },
    avatarInfoGrid: {
        display: 'flex',
        flexBasis: '70%',
        height: '4em',
        justifyContent: 'flex-start',
        paddingLeft: '2.5em'
    },
    profileAvatar: {
        height: '10em',
        width: '10em'
    },
    infoDescription: {
        fontSize: '0.6em',
        fontWeight: '600',
        display: 'block'
    },
    infoNumbers: {
        fontWeight: '600',
        '&:hover': {
            color: '#4136dd',
            borderBottom: '3px solid #4136dd'
        }
    },
    infoDescriptionTypography: {
        textAlign: 'center',
        lineHeight: '1em',
        padding: '0.97em 2em 0em 0em',
        color: '#787878',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    profileBannerFollowButton: {
        alignSelf: 'center',
        paddingLeft: '10.5em'
    },
    publicProfileLinkToProfileStats: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: '#00acee'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileBannerBar = props => {
    const { classes, currentUser, screenName, statusCount, friendsCount, followersCount, favouritesCount, tweetUserId, profileLinkColor, avatarImg, darkModeBorder, darkModeFont, darkModeComponentBackground } = props;
    return (
        <Query
            query={GET_USER_LISTS}
            variables={{
                screen_name: screenName
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <div><Error /></div>;
                return (
                    <React.Fragment>
                        <AppBar 
                            position="static" 
                            color="default" 
                            className={classes.bannerBarPlacement} 
                            style={{ backgroundColor: darkModeComponentBackground }}
                        >
                            <Toolbar style={{ border: darkModeBorder }}>
                                <Grid item className={classes.avatarBannerGrid}>
                                    <Avatar src={extractAndReplaceNormalJPG(avatarImg)} className={classes.profileAvatar} alt='User profile avatar' />
                                </Grid>
                                <Grid item className={classes.avatarInfoGrid}>
                                    <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography} style={{ color: darkModeFont }}>
                                        <Link to={`/userprofile/${screenName}`} className={classes.publicProfileLinkToProfileStats}>
                                            <span className={classes.infoDescription}>Tweets</span>
                                            <span className={classes.infoNumbers}>{statusCount}</span>
                                        </Link>
                                    </Typography> 
                                    <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography} style={{ color: darkModeFont }}>
                                        <Link to={`/following/${screenName}`} className={classes.publicProfileLinkToProfileStats}>
                                            <span className={classes.infoDescription}>Following</span>
                                            <span className={classes.infoNumbers}>{friendsCount}</span>
                                        </Link>
                                    </Typography>
                                    <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography} style={{ color: darkModeFont }}>
                                        <Link to={`/followers/${screenName}`} className={classes.publicProfileLinkToProfileStats}>
                                            <span className={classes.infoDescription}>Followers</span>
                                            <span className={classes.infoNumbers}>{followersCount}</span>
                                        </Link>
                                    </Typography>
                                    <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography} style={{ color: darkModeFont }}>
                                        <Link to={`/likes/${screenName}`} className={classes.publicProfileLinkToProfileStats}>
                                            <span className={classes.infoDescription}>Likes</span>
                                            <span className={classes.infoNumbers}>{favouritesCount}</span>
                                        </Link>
                                    </Typography>
                                    <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography} style={{ color: darkModeFont }}>
                                        <Link to={`/lists/${screenName}`} className={classes.publicProfileLinkToProfileStats}>
                                            <span className={classes.infoDescription}>Lists</span>
                                            <span className={classes.infoNumbers}>
                                                {data.currentUser ? data.currentUser.getLists.length : '0'}
                                            </span>
                                        </Link>
                                    </Typography>
                                    <div className={classes.profileBannerFollowButton}>
                                        {/* // * If viewing the logged in users profile, hide this button */}
                                        {currentUser === screenName
                                            ?
                                            null
                                            :
                                        <TooltipFollowButton
                                            currentUser={currentUser}
                                            screen_name={screenName}
                                            tweetUserId={tweetUserId}
                                            profileLinkColor={profileLinkColor}
                                        />}
                                    </div>
                                </Grid>
                            </Toolbar>
                        </AppBar>
                    </React.Fragment>                                              
                );
            }}
        </Query>  
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileBannerBar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
