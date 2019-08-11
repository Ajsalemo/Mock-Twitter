// * --------------------------------------------- Imports ----------------------------------------------- //
// * ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Waypoint } from 'react-waypoint';

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
    const { screenName, currentUser, profileLinkColor, classes, darkModeFont, darkModeComponentBackground } = props;
    const initialCursor = '-1';
    return (
        <Query
            query={USERS_FOLLOWERS}
            variables={{
                screen_name: screenName,
                cursor: initialCursor
            }}
        >
            {({ loading, data, error, fetchMore }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />     
                return (
                    /**
                     *   * This ternary checks to see if a user has any followers
                     *   * If they haven't, this will display a message - else it'll display their followers
                    */
                   // ! query.length checks to see if there is values being returned, if the values are empty a placeholder will be displayed
                    data.currentUser.usersFollowers.users.length ?
                        data.currentUser.usersFollowers.users.map((userFollowersList, i) => (
                            <React.Fragment key={i}>
                                <StaticToolTip
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
                                    darkModeFont={darkModeFont}
                                    darkModeComponentBackground={darkModeComponentBackground}
                                />
                                {i === data.currentUser.usersFollowers.users.length - 10 && (
                                    <Waypoint 
                                        onEnter={() => fetchMore({
                                            variables: {
                                                screen_name: screenName,
                                                cursor: data.currentUser.usersFollowers.next_cursor_str
                                            },
                                            // This method updates Apollo's store, it merges the old data with the new data being called by the API request
                                            updateQuery: (pv, { fetchMoreResult }) => {
                                                const previousCursor = pv.currentUser.usersFollowers.previous_cursor_str;
                                                const nextCursor = fetchMoreResult.currentUser.usersFollowers.next_cursor_str;
                                                // * If there are no results or the next_cursor is done traversing data/returning previous result then return from this method
                                                if(!fetchMoreResult || nextCursor === '0') {
                                                    return pv;
                                                }
                                                return {
                                                    // * This is structured like a normal apollo query
                                                    currentUser: {
                                                        __typename: 'User',
                                                        usersFollowers: {
                                                            __typename: 'UsersFollowing',
                                                            previous_cursor_str: previousCursor,
                                                            next_cursor_str: nextCursor, 
                                                            // * The spread operator adds the previous data collection as well as the new data when the user scrolls and triggers the waypoint, which calls the API
                                                            users: [
                                                                ...pv.currentUser.usersFollowers.users, 
                                                                ...fetchMoreResult.currentUser.usersFollowers.users
                                                            ]   
                                                        }                                                      
                                                    }
                                                }
                                            }
                                        })}                                     
                                    />
                                )}
                                </React.Fragment>
                            ))
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
