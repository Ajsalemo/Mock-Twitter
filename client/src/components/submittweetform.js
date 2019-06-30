// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form } from 'formik';
import classNames from 'classnames';

// Material-UI components
import { withStyles, TextField, Fab, Grid, Avatar, CircularProgress } from '@material-ui/core';

// Apollo Mutations
import { CREATE_USER_TWEET, GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    formControl: {
        width: '100%',
        height: '2.1em',
        margin: '0.6em',
        backgroundColor: '#fff',
    },
    formElement: {
        flexBasis: '80%'
    },
    tweetButtonMain: {
        backgroundColor: '#00acee',
        color: '#fff'
    },
    tweetButtonGrid: {
        display: 'flex',
        justifyContent: 'flex-end',
        paddingBottom: '0.7em'
    },
    tweetButtonGridHidden: {
        display: 'none'
    },
    tweetAvatarActiveInput: {
        alignSelf: 'flex-start',
        marginTop: '0.5em'
    },
    placeholder: {
        color: 'blue'
    },
    activeInputField: {
        width: '100%',
        height: '4em',
        margin: '0.6em',
        backgroundColor: '#fff',
    },
    activeTextField: {
        height: '-webkit-fill-available'
    },
    twitterAvatar: {
        width: 30,
        height: 30,
        display: 'flex',
        flexDirection: 'start'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SubmitTweetForm = props => {
    const { classes, data } = props;
    return (
        <React.Fragment>
            <Mutation 
                mutation={CREATE_USER_TWEET} 
                refetchQueries={[{ query: GET_AUTHUSER_TWEETS }]}
            >
                {(createTweetProp, { loading }) => (
                    <Formik
                        initialValues={{ tweet: '' }}
                        onSubmit={ async(values, { resetForm, setSubmitting }) => {
                            try {
                                await createTweetProp({
                                    variables: {
                                        full_text: values.tweet
                                    }
                                });
                                resetForm({ tweet: '' });
                            } catch(error) {
                                setSubmitting(false);
                                console.log(error)
                            }
                        }}
                        render={props => (
                            <React.Fragment>
                                <Avatar alt="twitter avatar" src={data.currentUser.profile_image_url_https} className={props.values.tweet ? classes.tweetAvatarActiveInput : classes.twitterAvatar} /> 
                                <Form className={classes.formElement}>
                                    <TextField
                                        className={props.values.tweet ? classes.activeInputField : classes.formControl}
                                        placeholder="What's happening?"
                                        variant="outlined"
                                        name="tweet"
                                        value={props.values.tweet}
                                        onChange={props.handleChange}
                                        InputProps={{ 
                                            classes: {
                                                input: props.values.tweet ? classNames(classes.placeholder, classes.activeTextField) : classes.placeholder,
                                                root: classes.activeTextField
                                            }
                                        }}
                                    />
                                    <Grid item className={props.values.tweet ? classes.tweetButtonGrid : classes.tweetButtonGridHidden}>
                                        {loading ?
                                            <CircularProgress />
                                                :
                                            <Fab 
                                                size="small" 
                                                variant="extended" 
                                                aria-label="Add Tweet" 
                                                className={classes.tweetButtonMain} 
                                                disabled={loading || !props.values.tweet}
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

export default withStyles(styles)(SubmitTweetForm);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
