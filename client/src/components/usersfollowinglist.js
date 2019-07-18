// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Components
import StaticToolTip from './statictooltip';
import Error from './error';

// Material-UI components
import { CircularProgress } from '@material-ui/core';

// Apollo Query
import { USERS_FOLLOWERS } from '../apolloclient/apolloqueries';

// Helper function
import { extractAndReplaceNormalJPG } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const UsersFollowingList = props => {
    const { screenName, currentUser, profileLinkColor } = props;
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
                return data.currentUser.usersFollowers.users.map((userFollowersList, i) => {
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
                });
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default UsersFollowingList;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
