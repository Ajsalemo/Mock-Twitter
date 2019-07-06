// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// Material-UI components
import { Avatar, Grid, AppBar, Toolbar, Typography, CircularProgress, withStyles } from '@material-ui/core';

// Apollo Queries
import { GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';
import TooltipFollowButton from '../components/tooltipfollowbutton';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    bannerBarPlacement: {
        marginTop: '-0.5em',
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
    const { classes, URLparam, currentUser } = props;
    return (
        <AppBar position="static" color="default" className={classes.bannerBarPlacement}>
            <Toolbar>
                <Query 
                    query={GET_USERPROFILE_TWEETS}
                    variables={{
                        screen_name: URLparam
                    }}
                >
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) return <div><Error /></div>; 
                    const filterProfileImageURL = data.currentUser.userProfileTweets[0].user.profile_image_url_https.replace('_normal.jpg', '.jpg');
                    return (
                        <React.Fragment>
                            <Grid item className={classes.avatarBannerGrid}>
                                <Avatar src={filterProfileImageURL} className={classes.profileAvatar} alt='User profile avatar' />
                            </Grid>
                            <Grid item className={classes.avatarInfoGrid}>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <Link to={`/userprofile/${URLparam}`} className={classes.publicProfileLinkToProfileStats}>
                                        <span className={classes.infoDescription}>Tweets</span>
                                        <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.statuses_count}</span>
                                    </Link>
                                </Typography> 
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <Link to={`/following/${URLparam}`} className={classes.publicProfileLinkToProfileStats}>
                                        <span className={classes.infoDescription}>Following</span>
                                        <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.friends_count}</span>
                                    </Link>
                                </Typography>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <Link to={`/followers/${URLparam}`} className={classes.publicProfileLinkToProfileStats}>
                                        <span className={classes.infoDescription}>Followers</span>
                                        <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.followers_count}</span>
                                    </Link>
                                </Typography>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <span className={classes.infoDescription}>Likes</span>
                                    <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.favourites_count}</span>
                                </Typography>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <span className={classes.infoDescription}>Lists</span>
                                    <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.listed_count}</span>
                                </Typography>
                                <div className={classes.profileBannerFollowButton}>
                                    {/* If viewing the logged in users profile, hide this button */}
                                    {currentUser === data.currentUser.userProfileTweets[0].user.screen_name
                                        ?
                                        null
                                        :
                                    <TooltipFollowButton
                                        currentUser={currentUser}
                                        screen_name={data.currentUser.userProfileTweets[0].user.screen_name}
                                        tweetUserId={data.currentUser.userProfileTweets[0].user.id}
                                    />}
                                </div>
                            </Grid>
                        </React.Fragment>
                        );
                    }}
                </Query>
            </Toolbar>
        </AppBar>    
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileBannerBar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
