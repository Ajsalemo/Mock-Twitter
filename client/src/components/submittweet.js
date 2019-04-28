// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Components
import Timeline from './timeline';
import SubmitTweetForm from './submittweetform';
import Error from './error';

// Apollo Queries
import { GET_USER } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    gridItem: {
        padding: '1em',
        [theme.breakpoints.up('md')]: {
            padding: '0 0.7em'
        }
    },
    paperOutline: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f8ff',
        borderRadius: '0%'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SubmitTweet = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query query={GET_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) return <div><Error /></div>;
                return (
                    <Grid item xs={10} sm={8} md={5} className={classes.gridItem}>
                        <Paper className={classes.paperOutline}>
                            <SubmitTweetForm 
                                data={data}
                            />
                        </Paper>
                        <Timeline />
                    </Grid>
                    );
                }}
            </Query>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SubmitTweet);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
