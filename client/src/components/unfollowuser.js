// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Apollo Mutations
import { UNFOLLOW_USER, COMPARE_FRIENDSHIPS} from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    followUserButton: {
        backgroundColor: '#00acee',
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
    const { classes, id_str, screen_name, currentUser } = props;
    return (
        <Mutation 
            mutation={UNFOLLOW_USER} 
            refetchQueries={[{ 
                query: COMPARE_FRIENDSHIPS,
                variables: {
                    target_screenName: screen_name,
                    source_screenName: currentUser
                }
            }]}
        >
            {(unfollowUserProp, { loading }) => (
                loading 
                    ? 
                <CircularProgress />
                    :
                <Fab
                    onClick={() => unfollowUserProp({
                        variables: {
                            id: id_str
                        }
                    })}
                    variant="extended"
                    aria-label="Follow user"
                    classes={{
                        root: classes.followUserButton
                    }}
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
