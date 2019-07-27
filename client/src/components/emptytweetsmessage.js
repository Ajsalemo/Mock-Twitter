// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { Typography, withStyles, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    messageGrid: {
        paddingTop: '4em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const EmptyTweetMessage = props => {
    const { classes, screenName, profileLinkColor, text, textPlacement } = props;
    return (
        <Grid className={classes.messageGrid}>
            <Typography 
                variant='h6' 
                gutterBottom 
                style={{ color: `#${profileLinkColor}` }}
                className={textPlacement}
            >
                {/* 
                    //* The text prop is based on which public profile/authorized user page you're viewing
                    //* Ex. - if you're viewing a users 'likes' page - this'll display '@screename hasn't liked any posts'
                    //* Ex. - if you're viewing a users 'following' page - this'll display '@screen hasn't followed anyone yet', etc.
                */}
                @{screenName} {text}
            </Typography>
        </Grid>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(EmptyTweetMessage);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //


