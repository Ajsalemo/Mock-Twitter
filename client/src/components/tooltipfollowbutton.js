// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { CircularProgress } from '@material-ui/core';

// Components
import FollowUser from './followuser';
import UnfollowUser from './unfollowuser';
import Error from './error';

// Apollo Queries
import { COMPARE_FRIENDSHIPS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const TooltipFollowButton = props => {
    const { screen_name, currentUser, tweetUserId } = props;
    return (
        <Query 
            query={COMPARE_FRIENDSHIPS} 
            variables={{ target_screenName: screen_name, source_screenName: currentUser}}
            fetchPolicy='cache-first'
        >
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />;
                
                return (
                    screen_name === currentUser
                        ?
                        null
                        :
                    data.currentUser.compareRelationship.relationship.target.followed_by === true
                        ?
                    <UnfollowUser
                        id={tweetUserId}
                        screen_name={screen_name}
                        currentUser={currentUser}
                    />
                        :
                    <FollowUser
                        id={tweetUserId}
                        screen_name={screen_name}
                        currentUser={currentUser}
                    />
                )
            }}
        </Query>

    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default TooltipFollowButton;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
