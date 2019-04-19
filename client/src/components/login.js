// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Fab from '@material-ui/core/Fab';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    button: {
        marginTop: '1.2em',
        backgroundColor: '#fff',
        color: '#00acee',
        border: '1px solid #00acee',
        '&:hover': {
            backgroundColor: '#d2d2d252'
        }
    },
    logInForm: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center'
    },
    textField: {
        marginRight: '1em'
    },
    dense: {
        marginTop: 16
    },
    mediaHidden: {
        [theme.breakpoints.down(768)]: {
            display: 'none'
        },
        [theme.breakpoints.up(508)]: {
            padding: '0em 0.3em'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Login = props => {
    const { classes } = props;
    return (
        <Grid item xs={12} className={classes.mediaHidden}>
            <form className={classes.logInForm}>
                <TextField
                    label="Phone, email, or username"
                    placeholder="Phone, email, or username"
                    margin="dense"
                    variant="outlined"
                    className={classNames(classes.textField, classes.dense)}
                />
                <TextField
                    label="password"
                    placeholder="Password"
                    margin="dense"
                    variant="outlined"
                    type="password"
                    className={classNames(classes.textField, classes.dense)}
                />  
                <Fab variant="extended" color="primary" aria-label="Log In" className={classes.button}>
                    Log in
                </Fab>
            </form>
        </Grid>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Login);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

