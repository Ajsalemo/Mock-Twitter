// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';

// Material-UI components
import { withStyles, Grid, Paper, Card, CardContent, Typography } from '@material-ui/core';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    spanLink: {
        fontSize: '0.6em',
        fontWeight: '100',
        textDecoration: 'none'
    },
    links: {
        textDecoration: 'none'
    },
    cardPadding: {
        padding: '15px'
    },
    recommendedCard: {
        borderRadius: '0%'
    },
    categoriesName: {
        color: '#00acee',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    expansionpanel: {
        boxShadow: 'none',
        '&:before': {
            backgroundColor: '#fff'
        }
    },
    expansionPanelDetails: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0em',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Recommended = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Grid>
                <Paper>
                    <Card className={classes.recommendedCard}>
                        <CardContent classes={{ root: classes.cardPadding }}>
                            <Typography variant="h6" gutterBottom>
                                <span className={classes.spacing}>Who to follow</span>
                            </Typography>
                            {/* Suggested Users API has been depricated as of the latest Twitter API release */}
                            <div>Placeholder</div>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </React.Fragment>
    );
};


// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Recommended);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
