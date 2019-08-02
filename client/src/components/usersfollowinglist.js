// * --------------------------------------------- Imports ----------------------------------------------- //
// * ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// * Components
import StaticToolTip from './statictooltip';
import Error from './error';
import EmptyTweetMessage from '../components/emptytweetsmessage';

// * Material-UI components
import { CircularProgress, withStyles } from '@material-ui/core';

// * Apollo Query
import { USERS_FOLLOWERS } from '../apolloclient/apolloqueries';

// * Helper function
import { extractAndReplaceNormalJPG } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    textPlacement: {
        textAlign: 'left'
    } 
});

// ----------------------------------------------------------------------------------------------------- //

const UsersFollowingList = props => {
    const { screenName, currentUser, profileLinkColor, classes } = props;
    return (
        <Query
            query={USERS_FOLLOWERS}
            variables={{
                screen_name: screenName
            }}
        >
            {({ loading, data, error }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />     
                return (
                    /**
                     *   * This ternary checks to see if a user has any followers
                     *   * If they haven't, this will display a message - else it'll display their followers
                    */
                   // ! query.length checks to see if there is values being returned, if the values are empty a placeholder will be displayed
                    data.currentUser.usersFollowers.users.length ?
                        data.currentUser.usersFollowers.users.map((userFollowersList, i) => {
                            return (
                                <StaticToolTip
                                    key={i}
                                    currentUser={currentUser}
                                    name={userFollowersList.name}
                                    screen_name={userFollowersList.screen_name}
                                    imgSrc={userFollowersList.profile_image_url_https}
                                    tweetUserId={userFollowersList.id_str}
                                    statuses_count={userFollowersList.statuses_count}
                                    followers_count={userFollowersList.followers_count}
                                    friends_count={userFollowersList.friends_count}
                                    bannerImageURL={extractAndReplaceNormalJPG(userFollowersList.profile_banner_url)}
                                    profileLinkColor={profileLinkColor}
                                />
                            );    
                        })
                        :
                    // ! If the associated profile isn't following anyone, this placeholder will be displayed
                    <EmptyTweetMessage 
                        screenName={screenName}
                        profileLinkColor={profileLinkColor}
                        text={"isn't following anyone yet"}
                        textPlacement={classes.textPlacement}
                    />
                );         
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(UsersFollowingList);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
