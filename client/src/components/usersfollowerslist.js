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
import { USERS_FOLLOWING } from '../apolloclient/apolloqueries';

// Helper function
import { extractAndReplaceNormalJPG } from '../apolloclient/apolloclient';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const UsersFollowingList = props => {
    const { currentUser, screenName, profileLinkColor } = props;
    return (
        <Query
            query={USERS_FOLLOWING}
            variables={{
                screen_name: screenName
            }}
        >
            {({ loading, data, error }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />
                return data.currentUser.usersFollowing.users.map((usersFollowersList, i) => {
                    return (
                        <StaticToolTip
                            key={i}
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
