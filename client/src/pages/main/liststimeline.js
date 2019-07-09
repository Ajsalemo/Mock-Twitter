// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { withStyles, Grid } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import Trending from '../../components/trending';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    listsTimelineContainer: {
        width: 'auto',
        padding: '4em 2em 0 0',
        marginLeft: '10em'
    },
    listsTimelineGrid: {
        display: 'flex',
        justifyContent: 'center',
        margin: '0 2em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsTimeline = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Navbar />
            <Grid container className={classes.listsTimelineContainer}>
                <Grid item xs={8} sm={8} md={2} className={classes.listsTimelineGrid}>
                    {/* This is a placeholder while the informational component gets built */}
                    {/* Using this to determine proper spacing */}
                    <Trending />
                </Grid>
                <Grid item md={6}>
                    <div>test</div>
                </Grid>
                <Grid item xs={8} sm={8} md={2} className={classes.listsTimelineGrid}>
                    <Trending />
                </Grid>
            </Grid>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ListsTimeline);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
