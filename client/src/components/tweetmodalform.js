// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';
import { Formik, Form } from 'formik';
import classNames from 'classnames';

// Material-UI components
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Apollo Mutations
import { CREATE_USER_TWEET, GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const TweetModalForm = props => {
    const { classes, avatar } = props;
    return (
        <React.Fragment>
            <Mutation mutation={CREATE_USER_TWEET} refetchQueries={[{ query: GET_AUTHUSER_TWEETS }]}>
                {(createModalTweetProp, { loading }) => (
                    <Formik
                        initialValues={{ tweetModalForm: '' }}
                        onSubmit={ async(values, { resetForm, setSubmitting }) => {
                            try {
                                await createModalTweetProp({
                                    variables: {
                                        text: values.tweetModalForm
                                    }
                                });
                                resetForm({ tweetModalForm: '' });
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
                                            <CircularProgress />
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
