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
import { COMPARE_FRIENDSHIPS, VERIFY_USER } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const TooltipFollowButton = props => {
    const { screen_name, tweetUserId } = props;
    return (
        <Query query={VERIFY_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />;
                const currentAuthenticatedUser = data.currentUser.verifyCredentials.screen_name;
                return (
                    <Query 
                        query={COMPARE_FRIENDSHIPS} 
                        variables={{ target_screenName: screen_name, source_screenName: currentAuthenticatedUser }}
                        fetchPolicy='cache-first'
                    >
                        {({ loading, error, data }) => {
                            if (loading) return <div><CircularProgress /></div>;
                            if (error) return <Error />;
                            
                            return (
                                screen_name === currentAuthenticatedUser
                                    ?
                                    null
                                    :
                                data.currentUser.compareRelationship.relationship.target.followed_by === true
                                    ?
                                <UnfollowUser
                                    id={tweetUserId}
                                    screen_name={screen_name}
                                    currentUser={currentAuthenticatedUser}
                                />
                                    :
                                <FollowUser
                                    id={tweetUserId}
                                    screen_name={screen_name}
                                    currentUser={currentAuthenticatedUser}
                                />
                            )
                        }}
                    </Query>        
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default TooltipFollowButton;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
