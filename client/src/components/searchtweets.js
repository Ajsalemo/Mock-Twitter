// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Formik, Form } from 'formik';
import { withRouter } from 'react-router-dom';
import classNames from 'classnames';

// * Material-UI components
import { Search } from '@material-ui/icons';
import { withStyles, TextField, InputAdornment, Fab, CircularProgress } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    navTextField: {
        height: '2em',
        paddingRight: '0em'
    },
    searchIconColor: {
        color: 'gray'
    },
    fabButton: {
        backgroundColor: 'inherit',
        boxShadow: 'none',
        '&:hover': {
            backgroundColor: 'inherit'
        }
    },
    // Used to override the disabled state RBGA background color
    fabDisabled: {
        backgroundColor: 'inherit !important'
    },
    darkModeTextFieldBackground: {
        backgroundColor: '#80808040'
    },
    darkModeFontClass: {
        color: '#fff'
    }
});

// ----------------------------------------------------------------------------------------------------- //

let SearchTweet = props => {
    const { classes, darkModeBorder, darkModeStatus } = props;
    return (
        <Formik 
            initialValues={{ search: '' }}
            onSubmit={ async(values, { resetForm, setSubmitting }) => {
                try {
                    resetForm({ search: '' });
                    // * After submitting the form, this pushes to the search results page
                    // * When then will use a Query component to pull data using the parameter passed in through here
                    await props.history.push(`/search/${values.search}`);
                } catch(error) {
                    setSubmitting(false);
                    console.log(error);
                }
            }}
            render={props => (
                <Form>
                    <TextField
                        placeholder="Search Twitter"
                        variant="outlined"
                        value={props.values.search}
                        name="search"
                        onChange={props.handleChange}
                        // ! Inline styles are used for dark mode
                        style={{ border: darkModeBorder }}
                        InputProps={{
                            endAdornment: (
                                props.isSubmitting 
                                    ?
                                <CircularProgress />
                                    :
                                <InputAdornment 
                                    variant="filled" 
                                    position="end"
                                >
                                    <Fab 
                                        className={classes.fabButton} 
                                        type="submit"
                                        disabled={props.isSubmitting || !props.values.search}
                                        classes={{
                                            disabled: classes.fabDisabled
                                        }}
                                    >
                                        <Search
                                            aria-label="Search form submit"
                                            classes={{
                                                root: classes.searchIconColor
                                            }}
                                        >
                                        </Search>
                                    </Fab>
                                </InputAdornment>
                            ),
                            classes: {
                                // * These ternaries run if the user has dark mode toggled or not
                                root: darkModeStatus ? classNames(classes.darkModeTextFieldBackground, classes.navTextField) : classes.navTextField,
                                input: darkModeStatus ? classes.darkModeFontClass : null
                            }
                        }}
                    />
                </Form>            
            )}
        />
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

SearchTweet = withStyles(styles)(SearchTweet);

export default withRouter(SearchTweet);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
