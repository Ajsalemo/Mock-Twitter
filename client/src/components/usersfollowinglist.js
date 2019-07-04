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

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const UsersFollowingList = props => {
    const { currentUser } = props;
    console.log(currentUser)
    return (
        <Query
            query={USERS_FOLLOWERS}
            variables={{
                screen_name: currentUser
            }}
        >
            {({ loading, data, error }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />
                
                return data.currentUser.usersFollowers.users.map((userFollowersList, i) => {
                    console.log(userFollowersList)
                    return (
                        <StaticToolTip
                            key={i}
                            name={userFollowersList.name}
                            screen_name={userFollowersList.screen_name}
                            nickname={userFollowersList.screen_name}
                            imgSrc={userFollowersList.profile_image_url_https}
                            currentUser={currentUser}
                            tweetUserId={userFollowersList.id_str}
                            statuses_count={userFollowersList.statuses_count}
                            followers_count={userFollowersList.followers_count}
                            friends_count={userFollowersList.friends_count}
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
