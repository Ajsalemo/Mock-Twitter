// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { ChatBubbleOutline, BarChart } from '@material-ui/icons';
import { withStyles, CircularProgress, Grid, Paper, CardMedia } from '@material-ui/core';

// Apollo Queries
import { GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// Components
import Error from './error';
import Tweettext from './tweettext';

// Images
import verifiedIcon from '../images/verifiedicon.png';

// Imported functions
import { pollMinute } from '../apolloclient/apolloclient';

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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const PublicProfileTimeline = props => {
    const { classes, URLparam } = props;
    return (
        <Query 
            query={GET_USERPROFILE_TWEETS} 
            variables={{
                screen_name: URLparam
            }}
            pollInterval={pollMinute(1000, 60)} 
            fetchPolicy='cache-and-network'
        >
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.publicTimelineLoadingDiv}><CircularProgress /></div>;
                if (error) return <div className={classes.publicTimelineLoadingDiv}><Error /></div>;
                return (
                    data.currentUser.userProfileTweets.map((userTweetInfo, i) => {
                        console.log(userTweetInfo);
                        return (
                            <Paper className={classes.publicTimelinePaper}>
                                <Grid item className={classes.profileTimelineGrid}>
                                    {/* Tweet text body */}
                                    <Tweettext
                                        name={userTweetInfo.user.name}
                                        verified={userTweetInfo.user.verified}
                                        nickname={userTweetInfo.user.screen_name}
                                        created_at={userTweetInfo.created_at}
                                        full_text={userTweetInfo.full_text}
                                    />
                                    {/* Tweet Media */}
                                    {userTweetInfo.entities.media ?
                                        <CardMedia
                                            component="img"
                                            alt="Twitter User post's related media"
                                            className={classes.mediaCard}
                                            image={userTweetInfo.entities.media[0].media_url_https}
                                            title="Twitter User post's related media"
                                        />
                                            :
                                        null
                                    }
                                </Grid>
                            </Paper>
                        );
                    })
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
