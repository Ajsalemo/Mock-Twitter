// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Apollo Queries
import { GET_USERPROFILE_TWEETS } from '../../apolloclient/apolloqueries';

// Components
import Navbar from '../../components/navbar';
import PublicProfileBanner from '../../components/publicprofilebanner';
import ProfileBannerBar from '../../components/profilebannerbar';
import ProfileHandle from '../../components/profilehandle';
import Recommended from '../../components/recommended';
import Trending from '../../components/trending';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicProfileContainerStyle: {
        marginTop: '0.7em',
        display: 'flex',
        justifyContent: 'space-around'
    },
    publicProfileHandlerGrid: {
        width: 'auto'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let PublicProfile = props => {
    const param = props.match.params.params; 
    const { classes } = props;
    return (
        <Query 
            query={GET_USERPROFILE_TWEETS}
            fetchPolicy='cache-and-network'
            variables={{
                screen_name: param
            }}
        >
            {({ loading, error, data }) => {
                console.log(data)
                return (
                    <React.Fragment>
                        <Navbar /> 
                        <PublicProfileBanner
                            loading={loading}
                            error={error}
                            profileBannerURL={data.currentUser.userProfileTweets[0].user.profile_banner_url}
                        />
                        <ProfileBannerBar 
                            loading={loading}
                            error={error}
                            statuses_count={data.currentUser.userProfileTweets[0].user.statuses_count}
                            friends_count={data.currentUser.userProfileTweets[0].user.friends_count}
                            followers_count={data.currentUser.userProfileTweets[0].user.followers_count}
                            favourites_count={data.currentUser.userProfileTweets[0].user.favourites_count}
                            listed_count={data.currentUser.userProfileTweets[0].user.listed_count}
                            screen_name={data.currentUser.userProfileTweets[0].user.screen_name}
                            tweetUserId={data.currentUser.userProfileTweets[0].user.id}
                            currentUser={data.currentUser.nickname}
                            profileImageURL={data.currentUser.userProfileTweets[0].user.profile_image_url_https}
                        />
                        <Grid container className={classes.publicProfileContainerStyle}>
                            <Grid item xs={8} sm={8} md={2} className={classes.publicProfileHandlerGrid}>
                                {/* This component is a place holder, for now */}
                                <ProfileHandle />
                            </Grid>
                            <Grid item md={2}>
                                <Recommended />
                                <Trending />
                            </Grid>
                        </Grid>       
                    </React.Fragment>   
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

PublicProfile = withStyles(styles)(PublicProfile);

export default withRouter(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
