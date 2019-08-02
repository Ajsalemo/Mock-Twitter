// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { connect } from 'react-redux';

// * Material-UI components
import { Close } from '@material-ui/icons';
import { withStyles, Paper, Grid, Typography } from '@material-ui/core';

// * Components
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

let TweetModalBody = props => {
    const { classes, onClose, userScreenName, avatarImg, screenName, profileLinkColor, dark_mode } = props;
    return (
        // ! Inline styles are used for dark mode
        <Paper className={classes.tweetModalPaper} tabIndex='-1' style={{ boder: dark_mode ? '1px solid #0a71b0' : null }}>
            {/* // ! Inline styles are used for dark mode */}
            <Grid item className={classes.tweetModalTypographyGrid} style={{ backgroundColor: dark_mode ? '#000000d6' : null }}>
                {/* // ! Inline styles are used for dark mode */}
                <Typography variant="subtitle2" className={classes.tweetModalHeader} style={{ color: dark_mode ? '#fff' : null }}>
                    {/* // * If the authenticated user is tweeting directly to the account - display the name of said account */}
                    {/* // * Else, display the defaulted text */}
                    {userScreenName ? `Tweet to ${userScreenName}` : 'Compose new Tweet'}
                </Typography>
                <div onClick={onClose} className={classes.closeIcon}>
                    <Close 
                        // ! Inline styles are used for dark mode 
                        style={{ color: dark_mode ? '#fff' : null }}
                    />
                </div>
            </Grid>
            {/* // ! Inline styles are used for dark mode */}
            <Grid item className={classes.tweetModalGrid} style={{ backgroundColor: dark_mode ? '#000000d6' : null }}>
                <TweetModalForm
                    avatarImg={avatarImg}
                    screenName={screenName}
                    onClose={onClose}
                    userScreenName={userScreenName}
                    profileLinkColor={profileLinkColor}
                    dark_mode={dark_mode}
                />
            </Grid>
        </Paper>
    );
};
        
// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    }
};

// ----------------------------------------------------------------------------------------------------- //

TweetModalBody = connect(
    mapStateToProps
)(TweetModalBody);

export default withStyles(styles)(TweetModalBody);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
