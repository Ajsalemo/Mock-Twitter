// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import Moment from 'react-moment';
import classNames from 'classnames';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Repeat from '@material-ui/icons/Repeat';
import BarChart from '@material-ui/icons/BarChart';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

// Apollo Queries
import { GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';
import LikeStatus from '../components/likestatus';
import UnLikeStatus from '../components/unlikestatus';

// Images
import verifiedIcon from '../images/verifiedicon.png';

// Imported functions
import { pollMinute } from '../apolloclient/apolloclient';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    timelinePaper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '1em',
        wordBreak: 'break-word',
        borderRadius: '0%',
        '&:hover': {
            backgroundColor: '#8080801f',
            cursor: 'pointer'
        }
    },
    timelineAvatar: {
        marginRight: '0.5em'
    },
    timelineGrid: {
        height: 'fit-content',
        width: '-webkit-fill-available'
    },
    timelineHandleFont: {
        fontWeight: '100',
        marginLeft: '0.4em'
    },
    timelimeTweets: {
        fontWeight: '300'
    },
    timelineDotSpacing: {
        margin: '0em 0.4em'
    },
    timelineIcons: {
        fontSize: '1.3em',
        marginRight: '0.5em',
    },
    verifiedTimelineIcon: {
        height: '1em',
        width: '1em',
        marginLeft: '0.4em'
    },
    mediaCard: {
        margin: '1em 0',
        height: '20em',
        borderRadius: '3%'    
    },
    errorAndLoadingDiv: {
        paddingTop: '1em',
        display: 'flex',
        justifyContent: 'center'
    },
    buttonOptionsGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    buttonOptionsSpacing: {
        marginRight: '2em'
    },
    buttonOptionsHover: {
        '&:hover': {
            cursor: 'pointer',
            color: '#005aff59'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const Timeline = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query 
                query={GET_AUTHUSER_TWEETS} 
                pollInterval={pollMinute(1000, 60)} 
                fetchPolicy='cache-and-network'
            >
                {({ loading, error, data }) => {
                    if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                    if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;
                    return (
                        data.currentUser.userTimelineTweets.map((timelineTweetInfo, i) => {
                            return (
                                <Paper className={classes.timelinePaper} key={i}>
                                    <Avatar alt="twitter avatar" src={timelineTweetInfo.user.profile_image_url_https} className={classes.timelineAvatar}/>
                                    <Grid item className={classes.timelineGrid}>
                                        {/* Name and handle */}
                                        <Typography variant="subtitle2">
                                            <span>{timelineTweetInfo.user.name}</span>
                                            {/* If the Twitter account is verified - display the blue 'check' icon */}
                                            {timelineTweetInfo.user.verified === true 
                                                ? 
                                            <img src={verifiedIcon} className={classes.verifiedTimelineIcon} alt="verified account" />
                                                : 
                                            null}
                                            <span className={classes.timelineHandleFont}>@{timelineTweetInfo.user.nickname}</span>
                                            <span className={classes.timelineDotSpacing}>&#8226;</span>
                                            <span className={classes.timelineHandleFont}><Moment fromNow>{timelineTweetInfo.created_at}</Moment></span>
                                           </Typography>
                                        {/* Tweet body */}
                                        <Typography variant="body2" gutterBottom>
                                            <span className={classes.timelimeTweets}>{timelineTweetInfo.full_text}</span>
                                        </Typography>
                                        {/* Tweet Media */}
                                        {timelineTweetInfo.entities.media ?
                                            <CardMedia
                                                component="img"
                                                alt="Twitter post's related media"
                                                className={classes.mediaCard}
                                                image={timelineTweetInfo.entities.media[0].media_url_https}
                                                title="Twitter post's related media"
                                            />
                                                :
                                            null
                                        }
                                        <Grid item>
                                            <Typography variant="subtitle2" className={classes.buttonOptionsGrid}>
                                                <div className={classNames(classes.buttonOptionsSpacing, classes.buttonOptionsHover)}>
                                                    <ChatBubbleOutline className={classes.timelineIcons} />
                                                </div>
                                                <div className={classNames(classes.buttonOptionsGrid, classes.buttonOptionsHover)}>
                                                    <Repeat className={classes.timelineIcons} /> 
                                                    <div className={classes.buttonOptionsSpacing}>{timelineTweetInfo.retweet_count}</div>
                                                </div>
                                                <div className={classNames(classes.buttonOptionsGrid, classes.buttonOptionsHover)}>
                                                    {timelineTweetInfo.favorited === true
                                                        ?
                                                    <UnLikeStatus
                                                        id={timelineTweetInfo.id_str}
                                                        favorite_count={timelineTweetInfo.favorite_count}    
                                                    />
                                                        :
                                                    <LikeStatus 
                                                        id={timelineTweetInfo.id_str}
                                                        favorite_count={timelineTweetInfo.favorite_count}
                                                    />}
                                                </div>
                                                <BarChart className={classNames(classes.timelineIcons, classes.buttonOptionsHover)} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            );
                        })
                    );
                }}
            </Query>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Timeline);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
