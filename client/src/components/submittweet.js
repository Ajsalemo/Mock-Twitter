// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
import { Query } from 'react-apollo';
import { withFormik, Form, Field } from 'formik';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';
import Fab from '@material-ui/core/Fab';

// Components
import Timeline from './timeline';

// Apollo Queries
import { GET_USER } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    gridItem: {
        padding: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 0.7em'
        }
    },
    paperOutline: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        borderRadius: '0%'
    },
    formControl: {
        width: '100%',
        height: '2.1em',
        margin: '0.6em',
        backgroundColor: '#fff',
    },
    formElement: {
        flexBasis: '80%'
    },
    twitterAvatar: {
        width: 30,
        height: 30,
        display: 'flex',
        flexDirection: 'start'
    },
    placeholder: {
        color: 'blue',
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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SubmitTweet = props => {
    const { classes, values, handleChange, handleBlur } = props;
    return (
        <React.Fragment>
            <Query query={GET_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) console.log(error);
                return (
                    <Grid item xs={10} sm={8} md={5} className={classes.gridItem}>
                        <Paper className={classes.paperOutline}>
                        <Avatar alt="twitter avatar" src={data.currentUser.picture} className={values.tweet ? classes.tweetAvatarActiveInput : classes.twitterAvatar} /> 
                            <Form className={classes.formElement}>
                                <TextField
                                    className={values.tweet ? classes.activeInputField : classes.formControl}
                                    placeholder="What's happening?"
                                    variant="outlined"
                                    name="tweet"
                                    value={values.tweet}
                                    onChange={handleChange}
                                    InputProps={{ 
                                        classes: {
                                            input: values.tweet ? classNames(classes.placeholder, classes.activeTextField) : classes.placeholder
                                        }
                                    }}
                                />
                                <Grid item className={values.tweet ? classes.tweetButtonGrid : classes.tweetButtonGridHidden}>
                                    <Fab size="small" variant="extended" aria-label="Add Tweet" className={classes.tweetButtonMain} type="submit">
                                        Tweet
                                    </Fab>
                                </Grid>
                            </Form>
                        </Paper>
                        <Timeline />
                    </Grid>
                    )
                }}
            </Query>
        </React.Fragment>
    ) 
};

// ----------------------------------------------------------------------------------------------------- //

const FormikForm = withFormik({
    mapPropsToValues() {
        return {
            tweet: ''
        }
    },
    handleSubmit(values) {
        console.log(values)
    }
})(SubmitTweet);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(FormikForm);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
