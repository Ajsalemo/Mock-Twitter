// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

// Apollo Mutations
import { FOLLOW_USER } from '../apolloclient/apolloqueries';

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

const UnfollowUser = props => {
    const { classes, id } = props;
    return (
        <Mutation mutation={FOLLOW_USER}>
            {(followUserProp, { loading }) => (
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
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(UnfollowUser);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
