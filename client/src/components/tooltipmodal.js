// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Material-UI components
import { withStyles, Grid, Card, CardContent, Avatar, Typography, Tooltip } from '@material-ui/core';

// Components
import TooltipFollowButton from './tooltipfollowbutton';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    ToolTipAvatar: {
        width: 70,
        height: 70,
        border: '4px solid #fff',
        margin: '-1.5em 0 0 0.5em'
    },
    ToolTipUpperCardContent: {
        padding: '0em',
        height: '10em'
    },
    ToolTipUpperText: {
        textAlign: 'left'
    },
    ToolTipHandleTextUpperDiv: {
        paddingLeft: '0.2em'
    },
    ToolTipHandleTextUpper: {
        wordBreak: 'break-word',
        display: 'block'
    },
    ToolTipHandleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '0.9em'
    },
    ToolTipTweetSpan: {
        color: 'gray',
        textAlign: 'left',
        marginRight: '0.5em'
    },
    ToolTipTweetCount: {
        display: 'block',
        fontWeight: '700'
    },
    ToolTipContent: {
        paddingTop: '0em'
    },
    ToolTipHandleTypography: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    ToolTipModalPaper: {
        backgroundColor: '#fff',
        borderRadius: '0%',
        boxShadow: 'none'
    },
    ToolTipAvatarParent: {
        marginRight: '0.5em'
    },
    ToolTipRootClass: {
        width: 'fit-content'
    },
    toolTipFollowGrid: {
        display: 'flex',
        justifyContent: 'flex-end'
    },
    toolTipBackground: {
        backgroundColor: '#fff',
        padding: '0em',
        boxShadow: '1px 1px 1px #00000073'
    },
    popperClass: {
        opacity: '1'
    },
    toolTipProfileLink: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    timelineTooltopBannerImage: {
        height: 'inherit'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ToolTipModal = props => {
    const { classes, name, screenName, statuses_count, friends_count, followers_count, imgSrc, currentUser, tweetUserId, profileLinkColor, profileBannerURL } = props;
    return (
        <React.Fragment>
            <Tooltip 
                classes={{
                    popper: classes.popperClass,
                    tooltip: classes.toolTipBackground
                }}
                title={ 
                    <Card className={classes.ToolTipModalPaper}>
                        <CardContent className={classes.ToolTipUpperCardContent}>
                            <img 
                                // Alt text is left empty due to this being a decorative image
                                alt={''}
                                src={profileBannerURL}
                                className={classes.timelineTooltopBannerImage}
                            />    
                        </CardContent>          
                        <Avatar alt="twitter avatar" src={imgSrc} className={classes.ToolTipAvatar} /> 
                        <CardContent className={classes.ToolTipContent}>
                            <Typography variant="h6" gutterBottom className={classes.ToolTipUpperText}>
                                <div className={classes.ToolTipHandleTextUpperDiv}>
                                    {/* These are passed in from 'timeline.js' */}
                                    <Link 
                                        to={`/userprofile/${screenName}`} 
                                        className={classNames(classes.ToolTipHandleTextUpper, classes.toolTipProfileLink)}
                                        style={{ color: `#${profileLinkColor}` }}
                                    >
                                        {name}                   
                                    </Link>
                                    <Link 
                                        to={`/userprofile/${screenName}`} 
                                        className={classNames(classes.ToolTipHandleTextLower, classes.toolTipProfileLink)}
                                        style={{ color: `#${profileLinkColor}` }}
                                    >
                                        @{screenName}
                                    </Link>
                                </div>
                            </Typography>
                            <Grid item className={classes.toolTipFollowGrid}>
                                <TooltipFollowButton
                                    currentUser={currentUser}
                                    screen_name={screenName}
                                    tweetUserId={tweetUserId}
                                    profileLinkColor={profileLinkColor}
                                />
                            </Grid>
                            <Typography variant="subtitle2" className={classes.ToolTipHandleTypography} gutterBottom>               
                                <div className={classes.ToolTipTweetSpan}>
                                    <span>Tweets</span>
                                    <span className={classes.ToolTipTweetCount}>
                                        <Link 
                                            to={`/userprofile/${screenName}`} 
                                            style={{ color: `#${profileLinkColor}` }}
                                            className={classes.toolTipProfileLink}
                                        >
                                            {statuses_count}
                                        </Link>
                                    </span>
                                </div> 
                                <div className={classes.ToolTipTweetSpan}>
                                    <span>Following</span>
                                    <span className={classes.ToolTipTweetCount}>
                                        <Link 
                                            to={`/following/${screenName}`} 
                                            style={{ color: `#${profileLinkColor}` }}
                                            className={classes.toolTipProfileLink}
                                        >
                                            {friends_count}
                                        </Link>
                                    </span>
                                </div>  
                                <div className={classes.ToolTipTweetSpan}>
                                    <span>Followers</span>
                                    <span className={classes.ToolTipTweetCount}>
                                        <Link 
                                            to={`/followers/${screenName}`} 
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
                } 
                interactive
            >
                <Avatar 
                    alt="twitter avatar" 
                    // This is passed in from 'timeline.js' 
                    src={imgSrc} 
                    className={classes.ToolTipAvatarParent}
                />
            </Tooltip>
        </React.Fragment>
    );    
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ToolTipModal);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
