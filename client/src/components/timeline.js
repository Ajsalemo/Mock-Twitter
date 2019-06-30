// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import classNames from 'classnames';

// Material-UI components
import { ChatBubbleOutline, BarChart } from '@material-ui/icons';
import { withStyles, Paper, Typography, CircularProgress, Grid, CardMedia } from '@material-ui/core';

// Apollo Queries
import { GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';
import LikeStatus from '../components/likestatus';
import UnLikeStatus from '../components/unlikestatus';
import RetweetModal from '../components/retweetmodal';
import Tweettext from '../components/tweettext';
import UnRetweetStatus from '../components/unretweet';
import ToolTipModal from '../components/tooltipmodal';

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
                fetchPolicy='network-only'
            >
                {({ loading, error, data }) => {
                    if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                    if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;
                    console.log(data)
                    return (
                        data.currentUser.userTimelineTweets.map((timelineTweetInfo, i) => {
                            console.log(timelineTweetInfo)
                            return (
                                <Paper className={classes.timelinePaper} key={i}>
                                    <ToolTipModal
                                        name={timelineTweetInfo.user.name}
                                        nickname={timelineTweetInfo.user.screen_name}
                                        currentUser={data.currentUser.screen_name}
                                        statuses_count={timelineTweetInfo.user.statuses_count}
                                        friends_count={timelineTweetInfo.user.friends_count}
                                        followers_count={timelineTweetInfo.user.followers_count}
                                        imgSrc={timelineTweetInfo.user.profile_image_url_https}
                                        id={timelineTweetInfo.id_str}  
                                        tweetUserId={timelineTweetInfo.user.id}
                                        verified={timelineTweetInfo.user.verified}  
                                    />
                                    <Grid item className={classes.timelineGrid}>
                                        {/* Tweet text body */}
                                        <Tweettext
                                            name={timelineTweetInfo.user.name}
                                            verified={timelineTweetInfo.user.verified}
                                            nickname={timelineTweetInfo.user.screen_name}
                                            created_at={timelineTweetInfo.created_at}
                                            full_text={timelineTweetInfo.full_text}
                                            id={timelineTweetInfo.id_str}
                                            tweetUserId={timelineTweetInfo.user.id}
                                        />
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
                                                    {/* This ternary block displays the option to whether or not to retweet a status */} 
                                                    {/* Depending on the returned boolean from the API call */}
                                                    {timelineTweetInfo.retweeted === true
                                                    // If this status has been retweeted, give the choice to unlike it 
                                                        ?
                                                    <UnRetweetStatus
                                                        id={timelineTweetInfo.id_str}
                                                        retweet_count={timelineTweetInfo.retweet_count}
                                                    />
                                                        :
                                                    // Else, if it hasn't been retweeted - give the option to be able to retweet it
                                                    <RetweetModal
                                                        retweet_count={timelineTweetInfo.retweet_count}
                                                        name={timelineTweetInfo.user.name}
                                                        verified={timelineTweetInfo.user.verified}
                                                        nickname={timelineTweetInfo.user.nickname}
                                                        created_at={timelineTweetInfo.created_at}
                                                        full_text={timelineTweetInfo.full_text}    
                                                        srcImage={timelineTweetInfo.user.profile_image_url_https}  
                                                        id={timelineTweetInfo.id_str}      
                                                    />}
                                                </div>
                                                <div className={classNames(classes.buttonOptionsGrid, classes.buttonOptionsHover)}>
                                                    {/* This ternary block displays the option to whether or not to like a status */} 
                                                    {/* Depending on the returned boolean from the API call */}
                                                    {timelineTweetInfo.favorited === true
                                                    // If this status has been liked alread - give the option to unline it
                                                        ?
                                                    <UnLikeStatus
                                                        id={timelineTweetInfo.id_str}
                                                        favorite_count={timelineTweetInfo.favorite_count}    
                                                    />
                                                    // Else, if it hasn't been liked - give the option to like the status
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
