// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from "react-apollo";
import Moment from 'react-moment';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Apollo Queries
import { GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';
import { Grid } from '@material-ui/core';

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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Timeline = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query query={GET_AUTHUSER_TWEETS} fetchPolicy='network-only'>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) console.log(error);

                    return data.currentUser.userTimelineTweets.map((timelineTweetInfo, i) => {
                        return (
                            <Paper className={classes.timelinePaper} key={i}>
                                <Avatar alt="twitter avatar" src={data.currentUser.picture} className={classes.timelineAvatar}/>
                                <Grid item className={classes.timelineGrid}>
                                    {/* Name and handle */}
                                    <Typography variant="subtitle2">
                                        <span>{data.currentUser.name}</span>
                                        <span className={classes.timelineHandleFont}>@{data.currentUser.nickname}</span>
                                        <span className={classes.timelineDotSpacing}>&#8226;</span>
                                        <span className={classes.timelineHandleFont}><Moment fromNow>{timelineTweetInfo.created_at}</Moment></span>
                                       </Typography>
                                    {/* Tweet body */}
                                    <Typography variant="body2" gutterBottom>
                                        <span className={classes.timelimeTweets}>{timelineTweetInfo.text}</span>
                                    </Typography>
                                </Grid>
                            </Paper>
                        )
                    });
                }}
            </Query>
        </React.Fragment>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Timeline);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
