// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Components
import Error from '../components/error';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    bannerBarPlacement: {
        marginTop: '-0.5em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileBannerBar = props => {
    const { classes } = props;
    return (
        <AppBar position="static" color="default" className={classes.bannerBarPlacement}>
            <Toolbar>
                <Typography variant="h6" color="inherit">
                    
                </Typography>
            </Toolbar>
        </AppBar>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileBannerBar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
