// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form } from 'formik';
import classNames from 'classnames';

// Material-UI components
import { withStyles, Typography, CircularProgress, Avatar, Grid, Fab, TextField } from '@material-ui/core';

// Apollo Queries and Mutations
import { CREATE_USER_TWEET, GET_AUTHUSER_TWEETS, GET_USER_STATUS_COUNT } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    tweetModalFormElement: {
        flexBasis: '90%'
    },
    tweetModalFormButtonMain: {
        backgroundColor: '#00acee',
        color: '#fff'
    },
    tweetModalButtonGrid: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: '0.7em'
    },
    tweetButtonGridHidden: {
        display: 'none'
    },
    tweetModalFormPlaceholder: {
        color: 'blue'
    },
    tweetModaActiveInput: {
        width: '100%',
        height: '4em',
        margin: '0.6em',
        backgroundColor: '#fff',
    },
    tweetModalActiveTextfield: {
        height: '-webkit-fill-available'
    },
    tweetModalAvatar: {
        width: 30,
        height: 30,
        margin: '0.5em 0 0.5em 0.5em'
    },
    tweetModalSubmitGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    tweetModalSubmittingText: {
        paddingLeft: '1em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const TweetModalForm = props => {
    const { classes, avatar, onClose, userScreenName } = props;
    return (
        <React.Fragment>
            <Mutation 
                mutation={CREATE_USER_TWEET}
                refetchQueries={[{ query: GET_AUTHUSER_TWEETS, GET_USER_STATUS_COUNT }]}
            >
                {(createModalTweetProp, { loading }) => (
                    <Formik
                        // the userScreenName prop is passed in from the publicProfileHandle component
                        // This is so the component can be re-used, incase the authenticated user wants tweet directly at the profile in question
                        initialValues={{ 
                            tweetModalForm: userScreenName ? `@${userScreenName} ` : '' 
                        }}
                        onSubmit={ async (values, { resetForm, setSubmitting }) => {
                            try {
                                await createModalTweetProp({
                                    variables: {
                                        full_text: values.tweetModalForm
                                    }
                                });
                                resetForm({ tweetModalForm: '' });
                                // After submitting the form - call this function to close the form
                                // This sets the modal 'state' to the opposite of the 'handleOpen' function - which opens the modal 
                                onClose()
                            } catch(error) {
                                setSubmitting(false);
                                console.log(error)
                            }
                        }}
                        render={props => (
                            <React.Fragment>
                                <Avatar alt="twitter avatar" src={avatar} className={classes.tweetModalAvatar} /> 
                                <Form className={classes.tweetModalFormElement}>
                                    <TextField
                                        className={classes.tweetModaActiveInput}
                                        placeholder="What's happening?"
                                        variant="outlined"
                                        name="tweetModalForm"
                                        value={props.values.tweetModalForm}
                                        onChange={props.handleChange}
                                        InputProps={{ 
                                            classes: {
                                                input: classNames(classes.tweetModalFormPlaceholder, classes.tweetModalActiveTextfield),
                                                root: classes.tweetModalActiveTextfield
                                            }
                                        }}
                                    />
                                    <Grid item className={classes.tweetModalButtonGrid}>
                                        {loading ?
                                            <Grid item className={classes.tweetModalSubmitGrid}>
                                                <CircularProgress />
                                                <Typography variant='h6' className={classes.tweetModalSubmittingText}>
                                                    Sending your tweet..
                                                </Typography>
                                            </Grid>
                                                :
                                            <Fab 
                                                size="small" 
                                                variant="extended" 
                                                aria-label="Add Tweet" 
                                                className={classes.tweetModalFormButtonMain} 
                                                disabled={loading || !props.values.tweetModalForm}
                                                type="submit"
                                            >
                                                Tweet
                                            </Fab>
                                        }
                                    </Grid>
                                </Form>
                            </React.Fragment>
                        )}
                    />
                )}  
            </Mutation>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(TweetModalForm);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
