// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from "react-apollo";

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import CircularProgress from '@material-ui/core/CircularProgress';

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
        alignItems: 'center'
    },
    formControl: {
        flexBasis: '80%',
        height: '2.1em',
        margin: '0.6em'
    },
    twitterAvatar: {
        width: 30,
        height: 30
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SubmitTweet = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query query={GET_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) console.log(error);

                return (
                    <Grid item xs={10} sm={8} md={5} className={classes.gridItem}>
                        <Paper className={classes.paperOutline}>
                        <Avatar alt="twitter avatar" src={data.currentUser.picture} className={classes.twitterAvatar} /> 
                            <TextField
                                className={classes.formControl}
                                placeholder="What's happening?"
                                variant="outlined"
                            />
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
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SubmitTweet);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
