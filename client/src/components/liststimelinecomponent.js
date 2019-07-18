// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import classNames from 'classnames';

// Material-UI components
import { ChatBubbleOutline, BarChart } from '@material-ui/icons';
import { withStyles, Paper, Typography, CircularProgress, Grid, CardMedia } from '@material-ui/core';

// Apollo Queries
import { GET_LISTS_TIMELINE } from '../apolloclient/apolloqueries';

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
    listsTimelinePaper: {
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
    listsTimelineAvatar: {
        marginRight: '0.5em'
    },
    listsTimelineGrid: {
        height: 'fit-content',
        width: '-webkit-fill-available'
    },
    listsTimelineIcons: {
        fontSize: '1.3em',
        marginRight: '0.5em',
    },
    listsMediaCard: {
        margin: '1em 0',
        height: '20em',
        borderRadius: '3%'    
    },
    errorAndLoadingDiv: {
        paddingTop: '1em',
        display: 'flex',
        justifyContent: 'center'
    },
    listsButtonOptionsGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    listsButtonOptionsSpacing: {
        marginRight: '2em'
    },
    listsButtonOptionsHover: {
        '&:hover': {
            cursor: 'pointer',
            color: '#005aff59'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const ListsTimelineComponent = props => {
    const { classes, currentUser, URLparam } = props;
    console.log(URLparam)
    return (
        <React.Fragment>
            <Query 
                query={GET_LISTS_TIMELINE} 
                pollInterval={pollMinute(1000, 60)} 
                fetchPolicy='network-only'
                variables={{
                    list_id: URLparam
                }}
            >
                {({ loading, error, data }) => {
                    if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                    if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;
                    return (
                        data.currentUser.getListsTimeline.map((getListsTimeline, i) => {
                            return (
                                <Paper className={classes.listsTimelinePaper} key={i}>
                                    <ToolTipModal
                                        name={getListsTimeline.user.name}
                                        screenName={getListsTimeline.user.screen_name}
                                        currentUser={currentUser}
                                        statuses_count={getListsTimeline.user.statuses_count}
                                        friends_count={getListsTimeline.user.friends_count}
                                        followers_count={getListsTimeline.user.followers_count}
                                        imgSrc={getListsTimeline.user.profile_image_url_https}
                                        id={getListsTimeline.id_str}  
                                        tweetUserId={getListsTimeline.user.id}
                                        verified={getListsTimeline.user.verified} 
                                        profileLinkColor={getListsTimeline.user.profile_link_color}  
                                    />
                                    <Grid item className={classes.listsTimelineGrid}>
                                        {/* Tweet text body */}
                                        <Tweettext
                                            name={getListsTimeline.user.name}
                                            verified={getListsTimeline.user.verified}
                                            nickname={getListsTimeline.user.screen_name}
                                            created_at={getListsTimeline.created_at}
                                            full_text={getListsTimeline.full_text}
                                            id={getListsTimeline.id_str}
                                            tweetUserId={getListsTimeline.user.id}
                                        />
                                        {/* Tweet Media */}
                                        {getListsTimeline.entities.media ?
                                            <CardMedia
                                                component="img"
                                                alt="Twitter post's related media"
                                                className={classes.listsMediaCard}
                                                image={getListsTimeline.entities.media[0].media_url_https}
                                                title="Twitter post's related media"
                                            />
                                                :
                                            null
                                        }
                                        <Grid item>
                                            <Typography variant="subtitle2" className={classes.listsButtonOptionsGrid}>
                                                <div className={classNames(classes.listsButtonOptionsSpacing, classes.listsButtonOptionsHover)}>
                                                    <ChatBubbleOutline className={classes.listsTimelineIcons} />
                                                </div>
                                                <div className={classNames(classes.listsButtonOptionsGrid, classes.listsButtonOptionsHover)}>
                                                    {/* This ternary block displays the option to whether or not to retweet a status */} 
                                                    {/* Depending on the returned boolean from the API call */}
                                                    {getListsTimeline.retweeted === true
                                                    // If this status has been retweeted, give the choice to unlike it 
                                                        ?
                                                    <UnRetweetStatus
                                                        id={getListsTimeline.id_str}
                                                        retweet_count={getListsTimeline.retweet_count}
                                                        screenName={getListsTimeline.user.screen_name}
                                                        retweetId={URLparam}
                                                    />
                                                        :
                                                    // Else, if it hasn't been retweeted - give the option to be able to retweet it
                                                    <RetweetModal
                                                        retweet_count={getListsTimeline.retweet_count}
                                                        name={getListsTimeline.user.name}
                                                        verified={getListsTimeline.user.verified}
                                                        nickname={getListsTimeline.user.screen_name}
                                                        screenName={getListsTimeline.user.screen_name}
                                                        created_at={getListsTimeline.created_at}
                                                        full_text={getListsTimeline.full_text}    
                                                        srcImage={getListsTimeline.user.profile_image_url_https}  
                                                        id={getListsTimeline.id_str}    
                                                        profileLinkColor={getListsTimeline.user.profile_link_color}  
                                                        retweetId={URLparam}
                                                    />}
                                                </div>
                                                <div className={classNames(classes.listsButtonOptionsGrid, classes.listsButtonOptionsHover)}>
                                                    {/* This ternary block displays the option to whether or not to like a status */} 
                                                    {/* Depending on the returned boolean from the API call */}
                                                    {getListsTimeline.favorited === true
                                                    // If this status has been liked alread - give the option to unline it
                                                        ?
                                                    <UnLikeStatus
                                                        id={getListsTimeline.id_str}
                                                        favorite_count={getListsTimeline.favorite_count}
                                                        screenName={getListsTimeline.user.screen_name} 
                                                        list_id={URLparam}   
                                                    />
                                                    // Else, if it hasn't been liked - give the option to like the status
                                                        :
                                                    <LikeStatus 
                                                        id={getListsTimeline.id_str}
                                                        favorite_count={getListsTimeline.favorite_count}
                                                        screenName={getListsTimeline.user.screen_name}
                                                        list_id={URLparam}
                                                    />}
                                                </div>
                                                <BarChart className={classNames(classes.listsTimelineIcons, classes.listsButtonOptionsHover)} />
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

export default withStyles(styles)(ListsTimelineComponent);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
