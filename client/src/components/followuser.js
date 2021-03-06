// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// * Material-UI components
import { withStyles, CircularProgress, Fab } from '@material-ui/core';

// * Apollo Mutations and Queries
import { FOLLOW_USER, COMPARE_FRIENDSHIPS, USERS_FOLLOWERS, USERS_FOLLOWING } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    followUserButton: {
        color: '#00acee',
        height: '2em',
        width: '5em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const FollowUser = props => {
    const { classes, id, screen_name, currentUser, profileLinkColor } = props;
    return (
        <Mutation 
            mutation={FOLLOW_USER} 
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
            {(followUserProp, { loading }) => (
                loading 
                    ? 
                <CircularProgress />
                    :
                <Fab
                    onClick={() => followUserProp({
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
                    style={{ backgroundColor: `#${profileLinkColor}` }}
                >
                    Follow
                </Fab>
            )}
        </Mutation>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(FollowUser);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
