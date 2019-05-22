// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Components
import Error from '../components/error';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    bannerHeight: {
        backgroundColor: '#007fec'
    },
    bannerPlaceholderImage: {
        height: '15em',
        backgroundColor: '#007fec'
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
    const { classes, error, loading, profileBannerURL } = props;
    return (
        loading ? <div className={classes.bannerErrorAndLoadingDiv}><CircularProgress /></div>
            :
        error ? <div className={classes.bannerErrorAndLoadingDiv}><Error /></div>  
            :   
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
        <Grid item className={classes.bannerPlaceholderImage}></Grid>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(PublicProfileBanner);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
