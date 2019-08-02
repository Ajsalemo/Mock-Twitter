// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// * Material-UI components
import { withStyles, Fab, CircularProgress } from '@material-ui/core';

// * Apollo Mutations
import { UNFOLLOW_USER, COMPARE_FRIENDSHIPS, USERS_FOLLOWERS, USERS_FOLLOWING } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    followUserButton: {
        color: '#fff',
        height: '2em',
        width: '6em',
        '&:hover': {
            backgroundColor: '#800000b3'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const UnfollowUser = props => {
    const { classes, id, screen_name, currentUser, profileLinkColor } = props;
    return (
        <Mutation 
            mutation={UNFOLLOW_USER} 
            refetchQueries={[
                { 
                    query: COMPARE_FRIENDSHIPS, 
                    variables: {
                        target_screenName: screen_name,
                        source_screenName: currentUser
                    }
                },
                {
                    query: USERS_FOLLOWERS,
                    variables: {
                        screen_name: currentUser
                    }
                },
                {
                    query: USERS_FOLLOWING,
                    variables: {
                        screen_name: currentUser
                    }
                }
            ]}
        >
            {(unfollowUserProp, { loading }) => (
                loading 
                    ? 
                <CircularProgress />
                    :
                <Fab
                    onClick={() => unfollowUserProp({
                        variables: {
                            id: id
                        }
                    })}
                    variant="extended"
                    aria-label="Follow user"
                    classes={{
                        root: classes.followUserButton
                    }}
                    // ! This inline style dictates what the user's color theme is set to
                    style={{ backgroundColor: `#${profileLinkColor}`}}
                >
                    Following
                </Fab>
            )}
        </Mutation>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(UnfollowUser);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
