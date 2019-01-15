// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

// Image
import twitterlogo from '../../images/twitterlogo.jpg';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    gridOne: {
        backgroundColor: '#00acee',
        background: `url(${twitterlogo}) no-repeat left`
    },
    gridTwo: {
        backgroundColor: '#fff'
    }
})

const Home = props => {
    const { classes } = props;
    return (
        <Grid container direction='column' style={{height: '100vh'}}>
            <Grid item xs={12} className={classes.gridOne}>
               
            </Grid>
            <Grid item xs={12} className={classes.gridTwo}>
               
            </Grid>
        </Grid>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Home);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
