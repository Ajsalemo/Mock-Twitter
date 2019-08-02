// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// * Material-UI components
import { withStyles, Fab, CircularProgress } from '@material-ui/core';

// * Apollo Mutation
import { SUBSCRIBE_TO_LIST, GET_LISTS_SHOW, GET_USER_LISTS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    subscribeListButtonClass: {
        backgroundColor: '#fff',
        color: '#00acee',
        height: '2em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SubscribeListButton = props => {
    const { classes, list_id, currentUser } = props;
    return (
        <Mutation
            mutation={SUBSCRIBE_TO_LIST}
            refetchQueries={[
                {
                    query: GET_LISTS_SHOW,
                    variables: {
                        list_id: list_id
                    }
                },
                {
                    query: GET_USER_LISTS,
                    // * currentUser is passed in from 'listsprofilehandle.js'
                    variables: {
                        screen_name: currentUser
                    }
                }
            ]}
        >
            {(subscribeListButton, { loading }) => (
                loading
                    ?
                <CircularProgress />
                    :
                <Fab
                    onClick={() => subscribeListButton({
                        variables: {
                            list_id: list_id
                        }
                    })}
                    variant="extended"
                    aria-label="Subscribe to this accounts list"
                    classes={{
                        root: classes.subscribeListButtonClass
                    }}
                >
                    Subscribe
                </Fab>
            )}
        </Mutation>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SubscribeListButton);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
