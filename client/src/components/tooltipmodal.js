 // --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

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
        color: '#00acee',
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
        borderRadius: '0%'
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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ToolTipModal = props => {
    const { classes, name, nickname, statuses_count, friends_count, followers_count, imgSrc, currentUser, tweetUserId } = props;
    return (
        <React.Fragment>
            <Tooltip 
                title={
                    <Paper>
                        <Card className={classes.ToolTipModalPaper}>
                            <CardContent className={classes.ToolTipUpperCardContent}></CardContent>          
                            <Avatar alt="twitter avatar" src={imgSrc} className={classes.ToolTipAvatar} /> 
                            <CardContent className={classes.ToolTipContent}>
                                <Typography variant="h6" gutterBottom className={classes.ToolTipUpperText}>
                                    <div className={classes.ToolTipHandleTextUpperDiv}>
                                        <span className={classes.ToolTipHandleTextUpper}>{name}</span>
                                        <span className={classes.ToolTipHandleTextLower}>@{nickname}</span>
                                    </div>
                                </Typography>
                                <Grid item className={classes.toolTipFollowGrid}>
                                    <TooltipFollowButton
                                        currentUser={currentUser}
                                        screen_name={nickname}
                                        tweetUserId={tweetUserId}
                                    />
                                </Grid>
                                <Typography variant="subtitle2" className={classes.ToolTipHandleTypography} gutterBottom>               
                                    <div className={classes.ToolTipTweetSpan}>
                                        <span>Tweets</span>
                                        <span className={classes.ToolTipTweetCount}>
                                            {statuses_count}
                                        </span>
                                    </div> 
                                    <div className={classes.ToolTipTweetSpan}>
                                        <span>Following</span>
                                        <span className={classes.ToolTipTweetCount}>
                                            {friends_count}
                                        </span>
                                    </div>  
                                    <div className={classes.ToolTipTweetSpan}>
                                        <span>Followers</span>
                                        <span className={classes.ToolTipTweetCount}>
                                            {followers_count}
                                        </span>
                                    </div>  
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                } 
                interactive
            >
                <Avatar 
                    alt="twitter avatar" 
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
