// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// * Material-UI components
import { withStyles, Grid, Paper } from '@material-ui/core';

// * Components
import Timeline from './timeline';
import SubmitTweetForm from './submittweetform';

//----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    gridItem: {
        padding: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 0.7em'
        }
    },
    paperOutline: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        borderRadius: '0%'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SubmitTweet = props => {
    const { classes, screenName, profileLinkColor, avatarImg, darkModeStatus, darkModeFont, darkModeBorder, darkModeComponentBackground } = props;
    return (
        <React.Fragment>
            <Grid item xs={10} sm={8} md={5} className={classes.gridItem} >
                {/* // ! Inline styles are used for dark mode */}
                <Paper className={classes.paperOutline} style={{ backgroundColor: darkModeComponentBackground, border: darkModeBorder }}>
                    <SubmitTweetForm 
                        avatarImg={avatarImg}
                        screenName={screenName}
                        profileLinkColor={profileLinkColor}
                        darkModeStatus={darkModeStatus}
                    />
                </Paper>
                <Timeline 
                    screenName={screenName}
                    profileLinkColor={profileLinkColor}
                    darkModeBorder={darkModeBorder}
                    darkModeComponentBackground={darkModeComponentBackground}
                    darkModeFont={darkModeFont}
                />
            </Grid>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SubmitTweet);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
