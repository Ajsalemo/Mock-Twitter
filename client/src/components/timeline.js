// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import Moment from 'react-moment';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Repeat from '@material-ui/icons/Repeat';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import BarChart from '@material-ui/icons/BarChart';
import Grid from '@material-ui/core/Grid';
import CardMedia from '@material-ui/core/CardMedia';

// Apollo Queries
import { GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';

// Images
import verifiedIcon from '../images/verifiedicon.png';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    timelinePaper: {
        display: 'flex',
        flexDirection: 'row',
        padding: '1em',
        wordBreak: 'break-word',
        borderRadius: '0%'
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
        marginRight: '2.7em',
        '&:hover': {
            cursor: 'pointer',
            color: '#005aff59'
        }
    },
    verifiedTimelineIcon: {
        height: '1em',
        width: '1em',
        marginLeft: '0.4em'
    },
    mediaCard: {
        margin: '1em 0',
        height: '20em'    
    }
});

// ----------------------------------------------------------------------------------------------------- //

const pollMinute = (a, b) => {
    return a * b;
};

// ----------------------------------------------------------------------------------------------------- //

const Timeline = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query query={GET_AUTHUSER_TWEETS} pollInterval={pollMinute(1000, 60)} fetchPolicy='network-only'>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) return <Error />;
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
                                            <ChatBubbleOutline className={classes.timelineIcons} />
                                            <Repeat className={classes.timelineIcons} />
                                            <FavoriteBorder className={classes.timelineIcons} />
                                            <BarChart className={classes.timelineIcons} />
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
