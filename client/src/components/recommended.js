// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Recommended = props => {
    const { classes } = props;
    return (
        <Grid item xs={8} sm={8} md={2}>
            <Paper>
                <Card>
                    <CardContent classes={{ root: classes.cardPadding }}>
                        <Typography variant="h6" gutterBottom>
                            <span className={classes.spacing}>Who to follow</span> 
                            &#8226;
                            <span className={classes.spanLink}>
                                <Link to='#/' className={classes.links}>Refresh</Link>
                            </span>
                            &#8226;
                            <span className={classes.spanLink}>
                                <Link to='#/' className={classes.links}>View all</Link>
                            </span>
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>
    )
};


// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Recommended);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
