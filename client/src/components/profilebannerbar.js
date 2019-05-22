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
import { Avatar } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    bannerBarPlacement: {
        marginTop: '-0.5em',
        height: '4em'
    },
    avatarBannerGrid: {
        display: 'flex',
        flexBasis: '30%',
        justifyContent: 'center',
        marginTop: '-4.5em'
    },
    avatarInfoGrid: {
        display: 'flex',
        flexBasis: '70%',
        height: '4em',
        justifyContent: 'flex-start',
        paddingLeft: '2.5em'
    },
    profileAvatar: {
        height: '10em',
        width: '10em'
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
    const { 
        loading,
        error,
        classes, 
        statuses_count,
        friends_count,
        currentUser,
        followers_count,
        favourites_count,
        listed_count,
        screen_name,
        tweetUserId,
        profileImageURL
    } = props;

    const filterProfileImageURL = profileImageURL.replace('_normal.jpg', '.jpg');
    return (
        loading ? <div className={classes.bannerErrorAndLoadingDiv}><CircularProgress /></div>
            :
        error ? <div className={classes.bannerErrorAndLoadingDiv}><Error /></div>  
            :   
        <AppBar position="static" color="default" className={classes.bannerBarPlacement}>
            <Toolbar>
                <React.Fragment>
                    <Grid item className={classes.avatarBannerGrid}>
                        <Avatar src={filterProfileImageURL} className={classes.profileAvatar} alt='User profile avatar' />
                    </Grid>
                    <Grid item className={classes.avatarInfoGrid}>
                        <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                            <span className={classes.infoDescription}>Tweets</span>
                            <span className={classes.infoNumbers}>{statuses_count}</span>
                        </Typography> 
                        <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                            <span className={classes.infoDescription}>Following</span>
                            <span className={classes.infoNumbers}>{friends_count}</span>
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                            <span className={classes.infoDescription}>Followers</span>
                            <span className={classes.infoNumbers}>{followers_count}</span>
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                            <span className={classes.infoDescription}>Likes</span>
                            <span className={classes.infoNumbers}>{favourites_count}</span>
                        </Typography>
                        <Typography variant="h6" color="inherit" className={classes.infoDescriptionTypography}>
                            <span className={classes.infoDescription}>Lists</span>
                            <span className={classes.infoNumbers}>{listed_count}</span>
                        </Typography>
                        <div className={classes.profileBannerFollowButton}>
                            <TooltipFollowButton
                                currentUser={currentUser}
                                screen_name={screen_name}
                                tweetUserId={tweetUserId}
                            />
                        </div>
                    </Grid>
                </React.Fragment>
            </Toolbar>
        </AppBar>    
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileBannerBar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
