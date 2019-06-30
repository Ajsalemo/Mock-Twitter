// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { withStyles, CircularProgress, Fab } from '@material-ui/core';

// Apollo Mutations and Queries
import { FOLLOW_USER, COMPARE_FRIENDSHIPS, GET_USER } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    followUserButton: {
        backgroundColor: '#fff',
        color: '#00acee',
        height: '2em',
        width: '5em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const FollowUser = props => {
    const { classes, id, screen_name, currentUser } = props;
    return (
        <Mutation 
            mutation={FOLLOW_USER} 
            refetchQueries={[{ 
                query: COMPARE_FRIENDSHIPS, GET_USER,
                variables: {
                    target_screenName: screen_name,
                    source_screenName: currentUser
                }
            }]}
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
