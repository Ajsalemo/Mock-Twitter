// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    button: {
        borderRadius: '37%',
        marginTop: '1.2em'
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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Login = props => {
    const { classes } = props;
    return (
        <Grid item xs={12}>
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
                <Button variant="outlined" color="primary" className={classes.button}>
                    Log in
                </Button>
            </form>
        </Grid>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Login);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

