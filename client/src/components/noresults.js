// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// * Material-UI components
import { Typography, withStyles, Grid } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    noResultsGrid: {
        display: 'flex',
        flexDirection: 'column',
        textAlign: 'center'
    },
    noResultsTypography: {
        fontSize: '2em',
        fontWeight: 'bold'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const NoResults = props => {
    const { classes, dark_mode } = props;
    return (
        <Grid className={classes.noResultsGrid}>
            <Typography 
                variant='h6'
                // ! This inline style dictates what the user's color theme is set to 
                style={{ color: dark_mode ? '#fff' : null }}
                className={classes.noResultsTypography}
            >
                {/* //* If the Search API returns no results, then display this message */}
                No results
            </Typography>
            <Typography variant='subtitle2' gutterBottom style={{ color: dark_mode ? '#fff' : null }}>
                Nothing came up for that search
            </Typography>
        </Grid>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(NoResults);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //


