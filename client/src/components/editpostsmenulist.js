// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { MenuItem, MenuList, CircularProgress } from '@material-ui/core';

// Apollo Mutation and Queries
import { DELETE_STATUS, GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const EditPostsMenuList = props => {
    const { id, handleClose } = props;
    return (
        <Mutation
            mutation={DELETE_STATUS}
            refetchQueries={[{ query: GET_AUTHUSER_TWEETS }]}
        >
            {(deleteStatusProp, { loading }) => (
                loading 
                    ?
                <CircularProgress />
                    :
                <MenuList onClick={handleClose}>
                    <MenuItem 
                        onClick={() => deleteStatusProp({
                            variables: {
                                id: id
                            }
                        })}
                    >
                        Delete Tweet
                    </MenuItem>
                </MenuList>
        
            )}
        </Mutation>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default EditPostsMenuList;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
