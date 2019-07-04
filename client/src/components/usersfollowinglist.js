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

// This function replaces the default picture size with a bigger one - the bigger one being a '.jpg' extension
// If the 'profile_banner_url' property on the Schema UserObject returns null, then the function does nothing
// This is so the profile banner image area will keep its defaulted blue color, this comes from the CSS class 'staticToolTipUpperCardContent' in 'statictooltip.js'
const extractAndReplaceNormalJPG = imageSrc => {
    if(imageSrc !== null) {
        return imageSrc.replace('_normal.jpg', '.jpg');
    } else {
        return;
    }
};

// ----------------------------------------------------------------------------------------------------- //

const UsersFollowingList = props => {
    const { currentUser } = props;
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
                    return (
                        <StaticToolTip
                            key={i}
                            name={userFollowersList.name}
                            screen_name={userFollowersList.screen_name}
                            nickname={userFollowersList.screen_name}
                            imgSrc={userFollowersList.profile_image_url_https}
                            tweetUserId={userFollowersList.id_str}
                            statuses_count={userFollowersList.statuses_count}
                            followers_count={userFollowersList.followers_count}
                            friends_count={userFollowersList.friends_count}
                            bannerImageURL={extractAndReplaceNormalJPG(userFollowersList.profile_banner_url)}
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
