// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';

// Material-UI components
import { withStyles, Paper, Card, CardContent, Avatar, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    twitterAvatar: {
        width: 70,
        height: 70,
        border: '4px solid #fff',
        '&:hover': {
            cursor: 'pointer'
        },
        margin: '-1.5em 0 0 0.5em'
    },
    upperCardContent: {
        height: '6em',
        padding: '0em'
    },
    upperText: {
        textAlign: 'center'
    },
    handleTextUpperDiv: {
        paddingLeft: '4em',
    },
    handleTextUpper: {
        wordBreak: 'break-word',
        display: 'block'
    },
    handleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '0.9em'
    },
    profileTweetSpan: {
        color: 'gray',
        textAlign: 'left'
    },
    profileHandlePaper: {
        borderRadius: '0%'
    },
    profileTweetCount: {
        display: 'block',
        fontWeight: '700'
    },
    rootClass: {
        paddingTop: '0em'
    },
    profileHandleTypography: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    linkToProfileStats: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: '#00acee'
        }
    },
    profileHandleImage: {
        height: 'inherit'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileHandle = props => {
    const { classes, profileLinkColor, profileBannerURL, profileImage, name, screenName, statusCount, friendsCount, followersCount } = props;
    return (
        <Paper>
            <Card className={classes.profileHandlePaper}>
                <CardContent 
                    className={classes.upperCardContent}
                    style={{ backgroundColor: `#${profileLinkColor}` }}
                >
                    <img 
                        // Alt is shown as an empty string due to these banners being a decorative image
                        alt={''}
                        src={profileBannerURL}
                        className={classes.profileHandleImage}
                    />
                </CardContent>  
                <Link to={`/userprofile/${screenName}`}>        
                    <Avatar alt="twitter avatar" src={profileImage} className={classes.twitterAvatar} /> 
                </Link>
                <CardContent className={classes.rootClass}>
                    <Typography variant="h6" gutterBottom className={classes.upperText}>
                        <div className={classes.handleTextUpperDiv}>
                            <span className={classes.handleTextUpper}>{name}</span>
                            <span className={classes.handleTextLower}>@{screenName}</span>
                        </div>
                    </Typography>
                    <Typography variant="subtitle2" className={classes.profileHandleTypography} gutterBottom>
                        <React.Fragment>
                            <div className={classes.profileTweetSpan}>
                                <Link to={`userprofile/${screenName}`} className={classes.linkToProfileStats}>
                                    <span>Tweets</span>
                                    <span 
                                        className={classes.profileTweetCount}
                                        style={{ color: `#${profileLinkColor}` }}
                                    >
                                        {statusCount}
                                    </span>
                                </Link>
                            </div> 
                            <div className={classes.profileTweetSpan}>
                                <Link to={`following/${screenName}`} className={classes.linkToProfileStats}>
                                    <span>Following</span>
                                    <span 
                                        className={classes.profileTweetCount}
                                        style={{ color: `#${profileLinkColor}` }}
                                    >
                                        {friendsCount}
                                    </span>
                                </Link>
                            </div>  
                            <div className={classes.profileTweetSpan}>
                                <Link to={`followers/${screenName}`} className={classes.linkToProfileStats}>
                                    <span>Followers</span>
                                    <span 
                                        className={classes.profileTweetCount}
                                        style={{ color: `#${profileLinkColor}` }}
                                    >
                                        {followersCount}
                                    </span>
                                </Link>
                            </div>  
                        </React.Fragment>   
                    </Typography>
                </CardContent>
            </Card>
        </Paper>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //