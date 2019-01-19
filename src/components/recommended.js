// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
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
    spacing: {
        padding: '0 0.3em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Recommended = props => {
    const { classes } = props;
    return (
        <Grid item>
            <Paper>
                <Card>
                    <CardContent>
                        <Typography variant="h6" gutterBottom>
                            <span className={classes.spacing}>Who to follow</span> 
                            &#8226;
                            <span className={classNames(classes.spanLink, classes.spacing)}>
                                <Link to='#/' className={classes.links}>Refresh</Link>
                            </span>
                            &#8226;
                            <span className={classNames(classes.spanLink, classes.spacing)}>
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
