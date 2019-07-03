// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// Material-UI components
import { withStyles, Paper, Card, CardContent, Avatar, Typography, CircularProgress } from '@material-ui/core';

// Apollo Queries
import { VERIFY_USER } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    twitterAvatar: {
        width: 70,
        height: 70,
        border: '4px solid #fff',
        '&:hover': {
            cursor: 'pointer'
        },
        margin: '-1.5em 0 0 0.5em'
    },
    upperCardContent: {
        backgroundColor: '#007fec',
        height: '6em'
    },
    upperText: {
        textAlign: 'center'
    },
    handleTextUpperDiv: {
        paddingLeft: '4em',
    },
    handleTextUpper: {
        wordBreak: 'break-word',
        display: 'block'
    },
    handleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '0.9em'
    },
    profileTweetSpan: {
        color: 'gray',
        textAlign: 'left'
    },
    profileHandlePaper: {
        borderRadius: '0%'
    },
    profileTweetCount: {
        color: '#00acee',
        display: 'block',
        fontWeight: '700'
    },
    rootClass: {
        paddingTop: '0em'
    },
    profileHandleTypography: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-around'
    },
    linkToProfileStats: {
        textDecoration: 'none',
        color: 'inherit',
        '&:hover': {
            color: '#00acee'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileHandle = props => {
    const { classes } = props;
    return (
        <Query query={VERIFY_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <div><Error /></div>;
                return (
                    <Paper>
                        <Card className={classes.profileHandlePaper}>
                            <CardContent className={classes.upperCardContent}></CardContent>          
                            <Avatar alt="twitter avatar" src={data.currentUser.verifyCredentials.profile_image_url_https} className={classes.twitterAvatar} /> 
                            <CardContent className={classes.rootClass}>
                                <Typography variant="h6" gutterBottom className={classes.upperText}>
                                    <div className={classes.handleTextUpperDiv}>
                                        <span className={classes.handleTextUpper}>{data.currentUser.verifyCredentials.name}</span>
                                        <span className={classes.handleTextLower}>@{data.currentUser.verifyCredentials.screen_name}</span>
                                    </div>
                                </Typography>
                                <Typography variant="subtitle2" className={classes.profileHandleTypography} gutterBottom>
                                    <React.Fragment>
                                        <div className={classes.profileTweetSpan}>
                                            <Link to={`userprofile/${data.currentUser.verifyCredentials.screen_name}`} className={classes.linkToProfileStats}>
                                                <span>Tweets</span>
                                                <span className={classes.profileTweetCount}>
                                                    {data.currentUser.verifyCredentials.statuses_count}
                                                </span>
                                            </Link>
                                        </div> 
                                        <div className={classes.profileTweetSpan}>
                                            <Link to={`following/${data.currentUser.verifyCredentials.screen_name}`} className={classes.linkToProfileStats}>
                                                <span>Following</span>
                                                <span className={classes.profileTweetCount}>
                                                    {data.currentUser.verifyCredentials.friends_count}
                                                </span>
                                            </Link>
                                        </div>  
                                        <div className={classes.profileTweetSpan}>
                                            <span>Followers</span>
                                            <span className={classes.profileTweetCount}>
                                                {data.currentUser.verifyCredentials.followers_count}
                                            </span>
                                        </div>  
                                    </React.Fragment>   
                                </Typography>
                            </CardContent>
                        </Card>
                    </Paper>
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //