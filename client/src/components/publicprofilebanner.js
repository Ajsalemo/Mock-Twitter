// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { withStyles, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    bannerHeight: {
        backgroundColor: '#007fec'
    },
    bannerPlaceholderImage: {
        height: '15em'
    },
    bannerImage: {
        width: '-webkit-fill-available'
    },
    bannerErrorAndLoadingDiv: {
        padding: '15em 0',
        display: 'flex',
        justifyContent: 'center',
        height: '30em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const PublicProfileBanner = props => {
    const { classes, profileLinkColor, profileBannerURL } = props;
    return (
        profileBannerURL
            ?
        <Grid item className={classes.bannerHeight}>
            <img 
                src={profileBannerURL}
                className={classes.bannerImage}
                alt='User profile banner' 
            />  
        </Grid>   
            :
        <Grid 
            item 
            className={classes.bannerPlaceholderImage}
            style={{ backgroundColor: `#${profileLinkColor}` }}
        >
            {/* This banner displays if the users profile_banner_url value is null */}
        </Grid>  
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(PublicProfileBanner);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
