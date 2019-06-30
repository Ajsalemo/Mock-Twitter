// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { MenuItem, MenuList, CircularProgress, withStyles } from '@material-ui/core';

// Apollo Mutation and Queries
import { DELETE_STATUS, GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    menuListItem: {
        '&:hover': {
            backgroundColor: '#007fec',
            color: '#fff'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const EditPostsMenuList = props => {
    const { id, handleClose, classes } = props;
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
                        className={classes.menuListItem}
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

export default withStyles(styles)(EditPostsMenuList);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
