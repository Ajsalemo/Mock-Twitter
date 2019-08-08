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
                                {/* // TODO - This is pulling the pagingated data, but not merging it with the original query - this needs to be fixed */}
                                {i === data.currentUser.usersFollowing.users.length - 10 && (
                                    <Waypoint 
                                        onEnter={() => fetchMore({
                                            variables: {
                                                screen_name: screenName,
                                                cursor: data.currentUser.usersFollowing.next_cursor_str
                                            },
                                            updateQuery: (pv, { fetchMoreResult }) => {
                                                if(!fetchMoreResult) {
                                                    return pv;
                                                }
                                                console.log(pv)
                                                console.log(fetchMoreResult)
                                                return {
                                                    currentUser: {
                                                        __typename: 'User',
                                                        usersFollowing: [
                                                            ...pv.currentUser.usersFollowing, 
                                                            ...fetchMoreResult.currentUser.usersFollowing
                                                        ]
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
