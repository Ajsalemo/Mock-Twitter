// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Apollo Queries
import { GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';
import TooltipFollowButton from '../components/tooltipfollowbutton';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    bannerBarPlacement: {
        marginTop: '-0.5em'
    },
    avatarBannerGrid: {
        display: 'flex',
        flexBasis: '30%'
    },
    avatarInfoGrid: {
        display: 'flex',
        flexBasis: '70%',
        height: '4em',
        justifyContent: 'flex-start',
        paddingLeft: '2.5em'
    },
    infoDescription: {
        fontSize: '0.6em',
        fontWeight: '600',
        display: 'block'
    },
    infoNumbers: {
        fontWeight: '600',
        '&:hover': {
            color: '#4136dd',
            borderBottom: '3px solid #4136dd'
        }
    },
    infoDescriptionTypography: {
        textAlign: 'center',
        lineHeight: '1em',
        padding: '0.97em 2em 0em 0em',
        color: '#787878',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    profileBannerFollowButton: {
        alignSelf: 'center',
        paddingLeft: '10.5em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileBannerBar = props => {
    const { classes, URLparam } = props;
    return (
        <AppBar position="static" color="default" className={classes.bannerBarPlacement}>
            <Toolbar>
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
                        <React.Fragment>
                            <Grid item className={classes.avatarBannerGrid}>
                                TEST
                            </Grid>
                            <Grid item className={classes.avatarInfoGrid}>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <span className={classes.infoDescription}>Tweets</span>
                                    <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.statuses_count}</span>
                                </Typography> 
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <span className={classes.infoDescription}>Following</span>
                                    <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.friends_count}</span>
                                </Typography>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <span className={classes.infoDescription}>Followers</span>
                                    <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.followers_count}</span>
                                </Typography>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <span className={classes.infoDescription}>Likes</span>
                                    <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.favourites_count}</span>
                                </Typography>
                                <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                                    <span className={classes.infoDescription}>Lists</span>
                                    <span className={classes.infoNumbers}>{data.currentUser.userProfileTweets[0].user.listed_count}</span>
                                </Typography>
                                <div className={classes.profileBannerFollowButton}>
                                    <TooltipFollowButton
                                        currentUser={data.currentUser.nickname}
                                        screen_name={data.currentUser.userProfileTweets[0].user.screen_name}
                                        tweetUserId={data.currentUser.userProfileTweets[0].user.id}
                                    />
                                </div>
                            </Grid>
                        </React.Fragment>
                        );
                    }}
                </Query>
            </Toolbar>
        </AppBar>    
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileBannerBar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
