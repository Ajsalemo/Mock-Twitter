// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import Moment from 'react-moment';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';

// Apollo Queries
import { GET_USERPROFILE_TWEETS, VERIFY_USER } from '../apolloclient/apolloqueries';

// Components
import Error from './error';
import TweetModal from './tweetmodal';

// Images
import verifiedIcon from '../images/verifiedicon.png';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicProfileUpperText: {
        textAlign: 'left'
    },
    publicProfileTextUpper: {
        wordBreak: 'break-word',
        display: 'inline-flex ',
    },
    publicProfileTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '0.7em',
        display: 'block',
        color: '#6a6a6a'
    },
    publicProfileCard: {
        boxShadow: 'none',
        backgroundColor: 'inherit',
        marginTop: '1em'
    },
    verifiedPublicHandleIcon: {
        height: '1em',
        width: '1em',
        marginLeft: '0.4em'
    },
    publicProfileCreatedAt: {
        fontWeight: '200',
        fontSize: '0.7em',
        color: '#6a6a6a'
    },
    createdAtIcon: {
        fontSize: '0.9em',
        color: '#6a6a6a',
        marginRight: '0.3em'
    },
    descriptionContent: {
        fontSize: '0.7em',
        fontWeight: '200',
        display: 'block',
        wordBreak: 'break-word',
        padding: '0.5em 0'
    },
    publicProfileCardContent: {
        padding: '2em 0.5em 0em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const PublicProfileHandle = props => {
    const { classes, URLparam } = props;
    return (
        <Query query={VERIFY_USER}>
            {({ loading, error, data }) => {
                const publicProfileAuthUser = data.currentUser.verifyCredentials.screen_name;
                return (
                    <Query 
                        query={GET_USERPROFILE_TWEETS}
                        variables={{
                            screen_name: URLparam
                        }}
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <div><CircularProgress /></div>;
                            if (error) return <div><Error /></div>;
            
                            return (
                                <Card className={classes.publicProfileCard}>
                                    <CardContent className={classes.publicProfileCardContent}>
                                        <Typography variant="h6" gutterBottom className={classes.publicProfileUpperText}>
                                            <span className={classes.publicProfileTextUpper}>{data.currentUser.userProfileTweets[0].user.name}</span>
                                            {data.currentUser.userProfileTweets[0].user.verified === true 
                                                ? 
                                            <img src={verifiedIcon} className={classes.verifiedPublicHandleIcon} alt="verified account" />
                                                : 
                                            null}
                                            <span className={classes.publicProfileTextLower}>@{data.currentUser.userProfileTweets[0].user.screen_name}</span>
                                            <span className={classes.descriptionContent}>{data.currentUser.userProfileTweets[0].user.description}</span>
                                            <CalendarToday className={classes.createdAtIcon} />
                                            <span className={classes.publicProfileCreatedAt}>
                                                Joined <Moment format={'MMMM YYYY'}>{data.currentUser.userProfileTweets[0].user.created_at}</Moment>
                                            </span>
                                            {/* If you're viewing your own profile, this component will be hidden */}
                                            {/* Else if you're viewing someone elses profile, the 'tweet at' component will be displayed */}
                                            {publicProfileAuthUser === URLparam
                                                ?
                                                null
                                                :
                                            <TweetModal 
                                                userToReply={data.currentUser.userProfileTweets[0].user.name}
                                                userScreenName={data.currentUser.userProfileTweets[0].user.screen_name}
                                            />}
                                            
                                        </Typography>
                                    </CardContent>
                                </Card>
                            );
                        }}
                    </Query>        
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(PublicProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
