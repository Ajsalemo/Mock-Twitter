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
    const { classes, profileLinkColor } = props;
    return (
        <Grid className={classes.noResultsGrid}>
            <Typography 
                variant='h6'
                // ! This inline style dictates what the user's color theme is set to 
                style={{ color: `#${profileLinkColor}` }}
                className={classes.noResultsTypography}
            >
                {/* //* If the Search API returns no results, then display this message */}
                No results
            </Typography>
            <Typography variant='subtitle2' gutterBottom>
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


