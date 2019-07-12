// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { withStyles, Fab, CircularProgress } from '@material-ui/core';

// Apollo Mutation
import { UNSUBSCRIBE_TO_LIST, GET_LISTS_SHOW, GET_USER_LISTS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    unsubscribeListButtonClass: {
        backgroundColor: '#00acee',
        color: '#fff',
        height: '2em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const UnsubscribeListButton = props => {
    const { classes, list_id, currentUser } = props;
    return (
        <Mutation
            mutation={UNSUBSCRIBE_TO_LIST}
            refetchQueries={[
                {
                    query: GET_LISTS_SHOW,
                    variables: {
                        list_id: list_id
                    }
                },
                {
                    query: GET_USER_LISTS,
                    // currentUser is passed in from 'listsprofilehandle.js'
                    variables: {
                        screen_name: currentUser
                    }
                }
            ]}
        >
            {(unsubscribeListProp, { loading }) => (
                loading
                    ?
                <CircularProgress />
                    :
                <Fab
                    onClick={() => unsubscribeListProp({
                        variables: {
                            list_id: list_id
                        }
                    })}
                    variant="extended"
                    aria-label="Subscribe to this accounts list"
                    classes={{
                        root: classes.unsubscribeListButtonClass
                    }}
                >
                    Unsubscribe
                </Fab>
            )}
        </Mutation>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(UnsubscribeListButton);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
