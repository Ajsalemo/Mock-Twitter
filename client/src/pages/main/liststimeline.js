// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import Trending from '../../components/trending';
import ListsTimelineComponent from '../../components/liststimelinecomponent';
import Error from '../../components/error';
import ListsProfileHandle from '../../components/listsprofilehandle';

// Apollo Query
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

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
        margin: '1em 2em 0em 2em'
    },
    listsTimelineGridMain: {
        marginTop: '1em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsTimeline = props => {
    const { classes } = props;
    const param = props.match.params.params;
    return (
        <React.Fragment>
            <Navbar />
            <Grid container className={classes.listsTimelineContainer}>
                <Query query={VERIFY_USER}>
                    {({ loading, error, data }) => {
                        if (loading) return <div><CircularProgress /></div>;
                        if (error) return <div><Error /></div>;

                        return (
                            <React.Fragment>
                                <Grid item xs={8} sm={8} md={2} className={classes.listsTimelineGrid}>
                                    <ListsProfileHandle 
                                        URLparam={param}
                                        currentUser={data.currentUser.verifyCredentials.screen_name}
                                    />
                                </Grid>
                                <Grid item md={6} className={classes.listsTimelineGridMain}>
                                    <ListsTimelineComponent
                                        URLparam={param}
                                        currentUser={data.currentUser.verifyCredentials.screen_name}
                                    />
                                </Grid>
                            </React.Fragment>
                        );
                    }}
                </Query>
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
