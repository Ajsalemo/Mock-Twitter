// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
import { Query } from 'react-apollo';

// * Material-UI components
import { ChatBubbleOutline, BarChart } from '@material-ui/icons';
import { withStyles, CircularProgress, Grid, Paper, CardMedia, Typography, Avatar } from '@material-ui/core';

// * Apollo Queries
import { GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// * Components
import Error from '../components/error';
import LikeStatus from '../components/likestatus';
import UnLikeStatus from '../components/unlikestatus';
import RetweetModal from '../components/retweetmodal';
import Tweettext from '../components/tweettext';
import UnRetweetStatus from '../components/unretweet';
import EmptyTweetMessage from '../components/emptytweetsmessage';

// * Helper function
import { pollMinute } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicTimelineLoadingDiv: {
        paddingTop: '1em',
        display: 'flex',
        justifyContent: 'center'
    },
    publicTimelinePaper: {
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
    profileTimelineGrid: {
        height: 'fit-content',
        width: '-webkit-fill-available'
    },
    profileButtonOptionsGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    profileMediaCard: {
        margin: '1em 0',
        height: '20em',
    },
    profileButtonOptionsSpacing: {
        marginRight: '2em'
    },
    profileButtonOptionsHover: {
        '&:hover': {
            cursor: 'pointer',
            color: '#005aff59'
        }
    },
    profileTimelineIcons: {
        fontSize: '1.3em',
        marginRight: '0.5em',
    },
    profileAvatar: {
        width: 70,
        height: 70,
        border: '4px solid #fff',
        margin: '-1.5em 0 0 0.5em'
    },
    textPlacement: {
        textAlign: 'center'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const PublicProfileTimeline = props => {
    const { classes, screenName, profileLinkColor, darkModeBorder, darkModeFont, darkModeComponentBackground } = props;
    return (
        <Query 
            query={GET_USERPROFILE_TWEETS} 
            variables={{
                screen_name: screenName
            }}
            pollInterval={pollMinute(1000, 30)} 
            fetchPolicy='cache-and-network'
        >
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.publicTimelineLoadingDiv}><CircularProgress /></div>;
                if (error) return <div className={classes.publicTimelineLoadingDiv}><Error /></div>;
                return (
                    /** 
                     *   * This ternary checks to see if a user has posted tweets
                     *   * If they haven't, this will display a message - else it'll display what the user has posted
                     */
                    // ! query.length checks to see if there is values being returned, if the values are empty a placeholder will be displayed
                    data.currentUser.userProfileTweets.length ? 
                        data.currentUser.userProfileTweets.map((userTweetInfo, i) => {
                            return (
                                // ! Inline styles are used for dark mode 
                                <Paper className={classes.publicTimelinePaper} key={i} style={{ backgroundColor: darkModeComponentBackground, border: darkModeBorder }}>
                                    <Avatar src={userTweetInfo.user.profile_image_url_https} alt='User profile avatar' />
                                    <Grid item className={classes.profileTimelineGrid}>
                                        {/* Tweet text body */}
                                        <Tweettext
                                            name={userTweetInfo.user.name}
                                            verified={userTweetInfo.user.verified}
                                            nickname={userTweetInfo.user.screen_name}
                                            created_at={userTweetInfo.created_at}
                                            full_text={userTweetInfo.full_text}
                                            darkModeFont={darkModeFont}
                                            darkModeComponentBackground={darkModeComponentBackground}                                    
                                        />
                                        {/* Tweet Media */}
                                        {userTweetInfo.entities.media ?
                                            <CardMedia
                                                component="img"
                                                alt="Twitter User post's related media"
                                                className={classes.profileMediaCard}
                                                image={userTweetInfo.entities.media[0].media_url_https}
                                                title="Twitter User post's related media"
                                            />
                                                :
                                            null
                                        }
                                        <Grid item>
                                            <Typography variant="subtitle2" className={classes.profileButtonOptionsGrid} style={{ color: darkModeFont }}>
                                                <div className={classNames(classes.profileButtonOptionsSpacing, classes.profileButtonOptionsHover)}>
                                                    <ChatBubbleOutline className={classes.profileTimelineIcons} />
                                                </div>
                                                <div className={classNames(classes.profileButtonOptionsGrid, classes.profileButtonOptionsHover)}>
                                                    {/* // * This ternary block displays the option to whether or not to retweet a status */} 
                                                    {/* // * Depending on the returned boolean from the API call */}
                                                    {userTweetInfo.retweeted === true
                                                    // * If this status has been retweeted, give the choice to unlike it 
                                                        ?
                                                    <UnRetweetStatus
                                                        id={userTweetInfo.id_str}
                                                        retweet_count={userTweetInfo.retweet_count}
                                                        screenName={screenName}
                                                    />
                                                        :
                                                    // Else, if it hasn't been retweeted - give the option to be able to retweet it
                                                    <RetweetModal
                                                        retweet_count={userTweetInfo.retweet_count}
                                                        name={userTweetInfo.user.name}
                                                        verified={userTweetInfo.user.verified}
                                                        nickname={userTweetInfo.user.nickname}
                                                        created_at={userTweetInfo.created_at}
                                                        full_text={userTweetInfo.full_text}    
                                                        srcImage={userTweetInfo.user.profile_image_url_https}  
                                                        id={userTweetInfo.id_str}      
                                                        screenName={screenName}
                                                        profileLinkColor={profileLinkColor}
                                                    />}
                                                </div>
                                                <div className={classNames(classes.profileButtonOptionsGrid, classes.profileButtonOptionsHover)}>
                                                    {/* // * This ternary block displays the option to whether or not to like a status */} 
                                                    {/* // * Depending on the returned boolean from the API call */}
                                                    {userTweetInfo.favorited === true
                                                    // * If this status has been liked alread - give the option to unline it
                                                        ?
                                                    <UnLikeStatus
                                                        id={userTweetInfo.id_str}
                                                        favorite_count={userTweetInfo.favorite_count} 
                                                        screenName={screenName}   
                                                    />
                                                    // * Else, if it hasn't been liked - give the option to like the status
                                                        :
                                                    <LikeStatus 
                                                        id={userTweetInfo.id_str}
                                                        favorite_count={userTweetInfo.favorite_count}
                                                        screenName={screenName}
                                                    />}
                                                </div>
                                                <BarChart className={classNames(classes.profileTimelineIcons, classes.profileButtonOptionsHover)} />
                                            </Typography>
                                        </Grid>
                                    </Grid>
                                </Paper>
                            );
                        })
                        :
                    // ! If the associated profile hasn't posted any tweets, this placeholder will be displayed
                    <EmptyTweetMessage
                        screenName={screenName}
                        text={"hasn't posted any tweets yet"}
                        profileLinkColor={profileLinkColor}
                        textPlacement={classes.textPlacement}
                    />
                );  
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(PublicProfileTimeline);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
