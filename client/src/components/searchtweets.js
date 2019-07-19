// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { Search } from '@material-ui/icons';
import { withStyles, TextField, InputAdornment } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    navTextField: {
        height: '-webkit-fill-available'
    },
    searchIconColor: {
        color: 'gray',
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SearchTweet = props => {
    const { classes } = props;
    return (
        <TextField
            placeholder="Search Twitter"
            variant="outlined"
            InputProps={{
                endAdornment: (
                    <InputAdornment variant="filled" position="end">
                        <Search
                            aria-label="Search form submit"
                            classes={{
                                root: classes.searchIconColor
                            }}
                        >
                        </Search>
                    </InputAdornment>
                ),
                classes: {
                    root: classes.navTextField
                }
            }}
        />
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SearchTweet);
