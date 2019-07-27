// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
import { Query } from 'react-apollo';

// Material-UI components
import { ChatBubbleOutline, BarChart } from '@material-ui/icons';
import { withStyles, CircularProgress, Grid, Paper, CardMedia, Typography, Avatar } from '@material-ui/core';

// Apollo Queries
import { GET_USERS_LIKES } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';
import LikeStatus from '../components/likestatus';
import UnLikeStatus from '../components/unlikestatus';
import RetweetModal from '../components/retweetmodal';
import Tweettext from '../components/tweettext';
import UnRetweetStatus from '../components/unretweet';
import EmptyTweetMessage from '../components/emptytweetsmessage';

// Imported functions
import { pollMinute } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    likesComponentLoadingDiv: {
        paddingTop: '1em',
        display: 'flex',
        justifyContent: 'center'
    },
    likesComponentPaper: {
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

const LikesComponent = props => {
    const { classes, screenName, profileLinkColor } = props;
    return (
        <Query 
            query={GET_USERS_LIKES} 
            variables={{
                screen_name: screenName
            }}
            pollInterval={pollMinute(1000, 60)} 
            fetchPolicy='cache-and-network'
        >
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.likesComponentLoadingDiv}><CircularProgress /></div>;
                if (error) return <div className={classes.likesComponentLoadingDiv}><Error /></div>;
                return (
                    /**
                     *   * This ternary checks to see if a user has liked any tweets
                     *   * If they haven't, this will display a message - else it'll display what the user has liked
                     */
                    data.currentUser.getUsersFavorites.length ?
                        data.currentUser.getUsersFavorites.map((usersLikes, i) => {
                            return (
                                <Paper className={classes.likesComponentPaper} key={i}>
                                    <Avatar src={usersLikes.user.profile_image_url_https} alt='User profile avatar' />
                                    <Grid item className={classes.profileTimelineGrid}>
                                        {/* Tweet text body */}
                                        <Tweettext
                                            name={usersLikes.user.name}
                                            verified={usersLikes.user.verified}
                                            nickname={usersLikes.user.screen_name}
                                            created_at={usersLikes.created_at}
                                            full_text={usersLikes.full_text}                                    
                                        />
                                        {/* Tweet Media */}
                                        {usersLikes.entities.media ?
                                            <CardMedia
                                                component="img"
                                                alt="Twitter User post's related media"
                                                className={classes.profileMediaCard}
                                                image={usersLikes.entities.media[0].media_url_https}
                                                title="Twitter User post's related media"
                                            />
                                                :
                                            null
                                        }
                                        <Grid item>
                                            <Typography variant="subtitle2" className={classes.profileButtonOptionsGrid}>
                                                <div className={classNames(classes.profileButtonOptionsSpacing, classes.profileButtonOptionsHover)}>
                                                    <ChatBubbleOutline className={classes.profileTimelineIcons} />
                                                </div>
                                                <div className={classNames(classes.profileButtonOptionsGrid, classes.profileButtonOptionsHover)}>
                                                    {/* This ternary block displays the option to whether or not to retweet a status */} 
                                                    {/* Depending on the returned boolean from the API call */}
                                                    {usersLikes.retweeted === true
                                                    // If this status has been retweeted, give the choice to unlike it 
                                                        ?
                                                    <UnRetweetStatus
                                                        id={usersLikes.id_str}
                                                        retweet_count={usersLikes.retweet_count}
                                                        screenName={screenName}
                                                    />
                                                        :
                                                    // Else, if it hasn't been retweeted - give the option to be able to retweet it
                                                    <RetweetModal
                                                        retweet_count={usersLikes.retweet_count}
                                                        name={usersLikes.user.name}
                                                        verified={usersLikes.user.verified}
                                                        nickname={usersLikes.user.nickname}
                                                        created_at={usersLikes.created_at}
                                                        full_text={usersLikes.full_text}    
                                                        srcImage={usersLikes.user.profile_image_url_https}  
                                                        id={usersLikes.id_str}      
                                                        screenName={screenName}
                                                        profileLinkColor={profileLinkColor}
                                                    />}
                                                </div>
                                                <div className={classNames(classes.profileButtonOptionsGrid, classes.profileButtonOptionsHover)}>
                                                    {/* This ternary block displays the option to whether or not to like a status */} 
                                                    {/* Depending on the returned boolean from the API call */}
                                                    {usersLikes.favorited === true
                                                    // If this status has been liked alread - give the option to unline it
                                                        ?
                                                    <UnLikeStatus
                                                        id={usersLikes.id_str}
                                                        favorite_count={usersLikes.favorite_count} 
                                                        screenName={screenName}   
                                                    />
                                                    // Else, if it hasn't been liked - give the option to like the status
                                                        :
                                                    <LikeStatus 
                                                        id={usersLikes.id_str}
                                                        favorite_count={usersLikes.favorite_count}
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
                    <EmptyTweetMessage 
                        screenName={screenName}
                        text={"hasn't liked any posts yet"}
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

export default withStyles(styles)(LikesComponent);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
