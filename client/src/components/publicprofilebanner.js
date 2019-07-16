// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, CircularProgress, Grid } from '@material-ui/core';

// Apollo Queries
import { GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// Components
import Error from '../components/error';

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
    const { classes, URLparam } = props;
    return (
        <Query 
            query={GET_USERPROFILE_TWEETS}
            variables={{
                screen_name: URLparam
            }}
        >
        {({ loading, error, data }) => {
            if (loading) return <div className={classes.bannerErrorAndLoadingDiv}><CircularProgress /></div>;
            if (error) return <div className={classes.bannerErrorAndLoadingDiv}><Error /></div>;
            return (
                    data.currentUser.userProfileTweets[0].user.profile_banner_url
                        ?
                    <Grid item className={classes.bannerHeight}>
                        <img 
                            src={data.currentUser.userProfileTweets[0].user.profile_banner_url}
                            className={classes.bannerImage}
                            alt='User profile banner' 
                        />  
                    </Grid>   
                        :
                    <Grid 
                        item 
                        className={classes.bannerPlaceholderImage}
                        style={{ backgroundColor: `#${data.currentUser.userProfileTweets[0].user.profile_link_color}` }}
                    >
                    </Grid>  
                );  
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(PublicProfileBanner);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
