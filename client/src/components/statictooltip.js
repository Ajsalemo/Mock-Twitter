// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
import { Link } from 'react-router-dom';

// Components
import ToolTipFollowButton from './tooltipfollowbutton';

// Material-UI components
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
        height: '6em'
    },
    staticToolTipUpperText: {
        textAlign: 'left'
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
        color: '#00acee',
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
        width: '16em'
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
    toolTilProfileLink: {
        textDecoration: 'none',
        color: '#000',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const StaticToolTip = props => {
    const { classes, name, nickname, imgSrc, currentUser, tweetUserId, statuses_count, followers_count, friends_count } = props;
    return (
        <Card className={classes.staticToolTipModalPaper} >
            <CardContent className={classes.staticToolTipUpperCardContent}></CardContent>          
            <Avatar alt="twitter avatar" src={imgSrc} className={classes.staticToolTipAvatar} /> 
            <CardContent className={classes.staticToolTipContent}>
                <Typography variant="h6" gutterBottom className={classes.staticToolTipUpperText}>
                    <div className={classes.staticToolTipHandleTextUpperDiv}>
                        <Link to={`userprofile/${nickname}`} className={classNames(classes.staticToolTipHandleTextUpper, classes.toolTilProfileLink)}>{name}</Link>
                        <Link to={`userprofile/${nickname}`} className={classNames(classes.staticToolTipHandleTextLower, classes.toolTilProfileLink)}>@{nickname}</Link>
                    </div>
                </Typography>
                <Grid item className={classes.staticToolTipFollowGrid}>
                    <ToolTipFollowButton
                        currentUser={currentUser}
                        screen_name={nickname}
                        tweetUserId={tweetUserId}
                    />
                </Grid>
                <Typography variant="subtitle2" className={classes.staticToolTipHandleTypography} gutterBottom>               
                    <div className={classes.staticToolTipTweetSpan}>
                        <span>Tweets</span>
                        <span className={classes.staticToolTipTweetCount}>
                            {statuses_count}
                        </span>
                    </div> 
                    <div className={classes.staticToolTipTweetSpan}>
                        <span>Following</span>
                        <span className={classes.staticToolTipTweetCount}>
                            {friends_count}
                        </span>
                    </div>  
                    <div className={classes.staticToolTipTweetSpan}>
                        <span>Followers</span>
                        <span className={classes.staticToolTipTweetCount}>
                            {followers_count}
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
