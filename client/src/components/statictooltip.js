// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// * Components
import ToolTipFollowButton from './tooltipfollowbutton';

// * Material-UI components
import { withStyles, Grid, Card, CardContent, Avatar, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    staticToolTipAvatar: {
        width: 70,
        height: 70,
        border: '4px solid #fff',
        margin: '-1.5em 0 0 0.5em'
    },
    staticToolTipUpperCardContent: {
        backgroundColor: '#007fec',
        height: '6em',
        padding: '0'
    },
    staticToolTipUpperText: {
        textAlign: 'left',
        width: '16em'
    },
    staticToolTipHandleTextUpperDiv: {
        paddingLeft: '0.2em'
    },
    staticToolTipHandleTextUpper: {
        wordBreak: 'break-word',
        display: 'block'
    },
    staticToolTipHandleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '0.9em'
    },
    staticToolTipTweetSpan: {
        color: 'gray',
        textAlign: 'left',
        marginRight: '0.5em'
    },
    staticToolTipTweetCount: {
        display: 'block',
        fontWeight: '700'
    },
    staticToolTipContent: {
        paddingTop: '0em'
    },
    staticToolTipHandleTypography: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    staticToolTipModalPaper: {
        backgroundColor: '#fff',
        borderRadius: '0%',
        boxShadow: 'none',
        width: '16em',
        display: 'inline-block',
        margin: '0 1em 0.8em 0'
    },
    staticToolTipAvatarParent: {
        marginRight: '0.5em'
    },
    staticToolTipFollowGrid: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    staticToolTipBackground: {
        backgroundColor: '#fff',
        padding: '0em',
        boxShadow: '1px 1px 1px #00000073'
    },
    toolTipProfileLink: {
        textDecoration: 'none',
        color: '#000',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    followingBannerImage: {
        height: 'inherit'
    }	    
});

// ----------------------------------------------------------------------------------------------------- //

const StaticToolTip = props => {
    const { classes, name, imgSrc, currentUser, tweetUserId, statuses_count, followers_count, friends_count, bannerImageURL, screen_name, profileLinkColor } = props;
    return (
        <Card className={classes.staticToolTipModalPaper} >
            <CardContent className={classes.staticToolTipUpperCardContent}>
                <img
                    // * Alt is shown as an empty string due to these banners being a decorative image
                    alt={''}
                    src={bannerImageURL}
                    className={classes.followingBannerImage}
                />
            </CardContent>          
            <Avatar alt={`${screen_name}'s profile avatar`} src={imgSrc} className={classes.staticToolTipAvatar} /> 
            <CardContent className={classes.staticToolTipContent}>
                <Typography variant="h6" gutterBottom className={classes.staticToolTipUpperText}>
                    <div className={classes.staticToolTipHandleTextUpperDiv}>
                        <Link to={`/userprofile/${screen_name}`} className={classNames(classes.staticToolTipHandleTextUpper, classes.toolTipProfileLink)}>{name}</Link>
                        <Link to={`/userprofile/${screen_name}`} className={classNames(classes.staticToolTipHandleTextLower, classes.toolTipProfileLink)}>@{screen_name}</Link>
                    </div>
                </Typography>
                <Grid item className={classes.staticToolTipFollowGrid}>
                    <ToolTipFollowButton
                        currentUser={currentUser}
                        screen_name={screen_name}
                        tweetUserId={tweetUserId}
                        profileLinkColor={profileLinkColor}
                    />
                </Grid>
                <Typography variant="subtitle2" className={classes.staticToolTipHandleTypography} gutterBottom>               
                    <div className={classes.staticToolTipTweetSpan}>
                        <span>Tweets</span>
                        <span 
                            className={classes.staticToolTipTweetCount}
                        >
                            <Link 
                                to={`/userprofile/${screen_name}`}
                                // ! This inline style dictates what the user's color theme is set to
                                style={{ color: `#${profileLinkColor}` }}
                                className={classes.toolTipProfileLink}
                            >
                                {statuses_count}
                            </Link>
                        </span>
                    </div> 
                    <div className={classes.staticToolTipTweetSpan}>
                        <span>Following</span>
                        <span 
                            className={classes.staticToolTipTweetCount}
                        >
                            <Link 
                                to={`/following/${screen_name}`}
                                // ! This inline style dictates what the user's color theme is set to
                                style={{ color: `#${profileLinkColor}` }}
                                className={classes.toolTipProfileLink}
                            >
                                {friends_count}
                            </Link>
                        </span>
                    </div>  
                    <div className={classes.staticToolTipTweetSpan}>
                        <span>Followers</span>
                        <span 
                            className={classes.staticToolTipTweetCount}
                        >
                            <Link 
                                to={`/followers/${screen_name}`}
                                // ! This inline style dictates what the user's color theme is set to
                                style={{ color: `#${profileLinkColor}` }}
                                className={classes.toolTipProfileLink}
                            >
                                {followers_count}
                            </Link>
                        </span>
                    </div>  
                </Typography>
            </CardContent>
        </Card>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(StaticToolTip);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
