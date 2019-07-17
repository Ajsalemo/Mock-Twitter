// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { Close } from '@material-ui/icons';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';

// Components
import TweetModalForm from '../components/tweetmodalform';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    tweetModalPaper: {
        width: '40em',
        backgroundColor: '#fff'
    },
    tweetModalHeader: {
        fontWeight: '800',
        padding: '0.5em',
        fontSize: '1.1em',
        textAlign: 'center',
        flexBasis: '95%'
    },
    tweetModalGrid: {
        backgroundColor: '#f0f8ff',
        display: 'flex',
        flexDirection: 'row'
    },
    tweetModalTypographyGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    closeIcon: {
        flexBasis: '5%',
        alignSelf: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const TweetModalBody = props => {
    const { classes, onClose, userScreenName, avatarImg, screenName, profileLinkColor } = props;
    return (
        <Paper className={classes.tweetModalPaper} tabIndex='-1'>
            <Grid item className={classes.tweetModalTypographyGrid}>
                <Typography variant="subtitle2" className={classes.tweetModalHeader}>
                    {/* If the authenticated user is tweeting directly to the account - display the name of said account */}
                    {/* Else, display the defaulted text */}
                    {userScreenName ? `Tweet to ${userScreenName}` : 'Compose new Tweet'}
                </Typography>
                <div onClick={onClose} className={classes.closeIcon}>
                    <Close />
                </div>
            </Grid>
            <Grid item className={classes.tweetModalGrid}>
                <TweetModalForm
                    avatarImg={avatarImg}
                    screenName={screenName}
                    onClose={onClose}
                    userScreenName={userScreenName}
                    profileLinkColor={profileLinkColor}
                />
            </Grid>
        </Paper>
    );
};
        
// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(TweetModalBody);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
