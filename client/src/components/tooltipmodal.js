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
        backgroundColor: '#007fec',
        height: '6em'
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
    toolTilProfileLink: {
        textDecoration: 'none',
        color: '#000',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ToolTipModal = props => {
    const { classes, name, nickname, statuses_count, friends_count, followers_count, imgSrc, currentUser, tweetUserId, profileLinkColor } = props;
    return (
        <React.Fragment>
            <Tooltip 
                classes={{
                    popper: classes.popperClass,
                    tooltip: classes.toolTipBackground
                }}
                title={ 
                    <Card className={classes.ToolTipModalPaper}>
                        <CardContent className={classes.ToolTipUpperCardContent}></CardContent>          
                        <Avatar alt="twitter avatar" src={imgSrc} className={classes.ToolTipAvatar} /> 
                        <CardContent className={classes.ToolTipContent}>
                            <Typography variant="h6" gutterBottom className={classes.ToolTipUpperText}>
                                <div className={classes.ToolTipHandleTextUpperDiv}>
                                    {/* These are passed in from 'timeline.js' */}
                                    <Link to={`userprofile/${nickname}`} className={classNames(classes.ToolTipHandleTextUpper, classes.toolTilProfileLink)}>{name}</Link>
                                    <Link to={`userprofile/${nickname}`} className={classNames(classes.ToolTipHandleTextLower, classes.toolTilProfileLink)}>@{nickname}</Link>
                                </div>
                            </Typography>
                            <Grid item className={classes.toolTipFollowGrid}>
                                <TooltipFollowButton
                                    // These are passed in from 'timeline.js'
                                    currentUser={currentUser}
                                    screen_name={nickname}
                                    tweetUserId={tweetUserId}
                                    profileLinkColor={profileLinkColor}
                                />
                            </Grid>
                            <Typography variant="subtitle2" className={classes.ToolTipHandleTypography} gutterBottom>               
                                <div className={classes.ToolTipTweetSpan}>
                                    <span>Tweets</span>
                                    <span className={classes.ToolTipTweetCount} style={{ color: `#${profileLinkColor}` }}>
                                        {/* This is passed in from 'timeline.js' */}
                                        {statuses_count}
                                    </span>
                                </div> 
                                <div className={classes.ToolTipTweetSpan}>
                                    <span>Following</span>
                                    <span className={classes.ToolTipTweetCount} style={{ color: `#${profileLinkColor}` }}>
                                        {/* This is passed in from 'timeline.js' */}
                                        {friends_count}
                                    </span>
                                </div>  
                                <div className={classes.ToolTipTweetSpan}>
                                    <span>Followers</span>
                                    <span className={classes.ToolTipTweetCount} style={{ color: `#${profileLinkColor}` }}>
                                        {/* This is passed in from 'timeline.js' */}
                                        {followers_count}
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
