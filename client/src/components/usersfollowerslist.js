// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

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
import { USERS_FOLLOWING } from '../apolloclient/apolloqueries';

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
    const { currentUser, screenName, profileLinkColor, classes, darkModeFont, darkModeComponentBackground } = props;
    const initialCursor = '-1';
    return (
        <Query
            query={USERS_FOLLOWING}
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
                     *   * This ternary checks to see if a user has followed any accounts
                     *   * If they haven't, this will display a message - else it'll display who the user has followed
                     */
                    // ! query.length checks to see if there is values being returned, if the values are empty a placeholder will be display
                    data.currentUser.usersFollowing.users.length ? 
                        data.currentUser.usersFollowing.users.map((usersFollowersList, i) => (
                            <React.Fragment key={i}>
                                <StaticToolTip
                                    currentUser={currentUser}
                                    name={usersFollowersList.name}
                                    screen_name={usersFollowersList.screen_name}
                                    nickname={usersFollowersList.screen_name}
                                    imgSrc={usersFollowersList.profile_image_url_https}
                                    tweetUserId={usersFollowersList.id_str}
                                    statuses_count={usersFollowersList.statuses_count}
                                    followers_count={usersFollowersList.followers_count}
                                    friends_count={usersFollowersList.friends_count}
                                    bannerImageURL={extractAndReplaceNormalJPG(usersFollowersList.profile_banner_url)}
                                    profileLinkColor={profileLinkColor}
                                    darkModeFont={darkModeFont}
                                    darkModeComponentBackground={darkModeComponentBackground}
                                />
                                {/* // * When the data list is 10 from the end, call this function to display more items */}
                                {i === data.currentUser.usersFollowing.users.length - 10 && (
                                    <Waypoint 
                                        onEnter={() => fetchMore({
                                            variables: {
                                                screen_name: screenName,
                                                cursor: data.currentUser.usersFollowing.next_cursor_str
                                            },
                                            // This method updates Apollo's store, it merges the old data with the new data being called by the API request
                                            updateQuery: (pv, { fetchMoreResult }) => {
                                                const previousCursor = pv.currentUser.usersFollowing.previous_cursor_str;
                                                const nextCursor = fetchMoreResult.currentUser.usersFollowing.next_cursor_str;
                                                // * If there are no results or the next_cursor is done traversing data/returning previous result then return from this method
                                                if(!fetchMoreResult || nextCursor === '0') {
                                                    return pv;
                                                }
                                                return {
                                                    // * This is structured like a normal apollo query
                                                    currentUser: {
                                                        __typename: 'User',
                                                        usersFollowing: {
                                                            __typename: 'UsersFollowers',
                                                            previous_cursor_str: previousCursor,
                                                            next_cursor_str: nextCursor, 
                                                            // * The spread operator adds the previous data collection as well as the new data when the user scrolls and triggers the waypoint, which calls the API
                                                            users: [
                                                                ...pv.currentUser.usersFollowing.users, 
                                                                ...fetchMoreResult.currentUser.usersFollowing.users
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
                    // ! If the associated profile doesn't have any followers, this placeholder will be displayed
                    <EmptyTweetMessage 
                        screenName={screenName}
                        text={"doesn't have any followers yet"}
                        profileLinkColor={profileLinkColor}
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
