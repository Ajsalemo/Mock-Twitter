// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from "react-apollo";

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Apollo Queries
import { GET_USER } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = ()=> ({
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
    profileHandlerGrid: {
        width: 'auto'
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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileHandle = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query query={GET_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) console.log(error);

                return (
                    <Grid item xs={8} sm={8} md={2} className={classes.profileHandlerGrid}>
                        <Paper>
                            <Card className={classes.profileHandlePaper}>
                                <CardContent className={classes.upperCardContent}></CardContent>          
                                <Avatar alt="twitter avatar" src={data.currentUser.picture} className={classes.twitterAvatar} /> 
                                <CardContent className={classes.rootClass}>
                                    <Typography variant="h6" gutterBottom className={classes.upperText}>
                                        <div className={classes.handleTextUpperDiv}>
                                            <span className={classes.handleTextUpper}>{data.currentUser.name}</span>
                                            <span className={classes.handleTextLower}>@{data.currentUser.nickname}</span>
                                        </div>
                                    </Typography>
                                    <Typography variant="subtitle2" gutterBottom>
                                        <div className={classes.profileTweetSpan}>
                                            <span>Tweets</span>
                                            <span className={classes.profileTweetCount}>5</span>
                                        </div>
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Paper>
                    </Grid>
                    )
                }}
            </Query>
        </React.Fragment>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //