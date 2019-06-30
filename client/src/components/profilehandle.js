// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Paper, Card, CardContent, Avatar, Typography, CircularProgress } from '@material-ui/core';

// Apollo Queries
import { GET_USER } from '../apolloclient/apolloqueries';

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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileHandle = props => {
    const { classes } = props;
    return (
        <Query query={GET_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <div><Error /></div>;
                console.log(data)
                return (
                    <Paper>
                        <Card className={classes.profileHandlePaper}>
                            <CardContent className={classes.upperCardContent}></CardContent>          
                            <Avatar alt="twitter avatar" src={data.currentUser.profile_image_url_https} className={classes.twitterAvatar} /> 
                            <CardContent className={classes.rootClass}>
                                <Typography variant="h6" gutterBottom className={classes.upperText}>
                                    <div className={classes.handleTextUpperDiv}>
                                        <span className={classes.handleTextUpper}>{data.currentUser.name}</span>
                                        <span className={classes.handleTextLower}>@{data.currentUser.screen_name}</span>
                                    </div>
                                </Typography>
                                <Typography variant="subtitle2" className={classes.profileHandleTypography} gutterBottom>
                                    <React.Fragment>
                                        <div className={classes.profileTweetSpan}>
                                            <span>Tweets</span>
                                            <span className={classes.profileTweetCount}>
                                                {data.currentUser.statuses_count}
                                            </span>
                                        </div> 
                                        <div className={classes.profileTweetSpan}>
                                            <span>Following</span>
                                            <span className={classes.profileTweetCount}>
                                                {data.currentUser.friends_count}
                                            </span>
                                        </div>  
                                        <div className={classes.profileTweetSpan}>
                                            <span>Followers</span>
                                            <span className={classes.profileTweetCount}>
                                                {data.currentUser.followers_count}
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