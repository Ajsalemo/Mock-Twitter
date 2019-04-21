// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Images
import errorImage from '../images/error-gasp-emoji.jpg';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    errorSpan: {
        display: 'block'
    },
    errorImage: {
        height: '2em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Error = props => {
    const { error, classes } = props;
    return (
        <Typography variant="subtitle2">
            An error has occured: <img src={errorImage} className={classes.errorImage} alt="an error has occured" />
            <span className={classes.errorSpan}>{error}</span>
        </Typography>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Error);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
