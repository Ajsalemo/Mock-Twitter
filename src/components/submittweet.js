// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';

// Image
import avatar from '../images/avatar.png';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    gridItem: {
        padding: '0 0.7em'
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
    const{ classes } = props;
    return (
        <Grid item xs={4} className={classes.gridItem}>
            <Paper className={classes.paperOutline}>
            <Avatar alt="twitter avatar" src={avatar} className={classes.twitterAvatar} /> 
                <TextField
                    className={classes.formControl}
                    placeholder="What's happening?"
                    variant="outlined"
                />
            </Paper>
        </Grid>
    )
};


// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SubmitTweet);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
