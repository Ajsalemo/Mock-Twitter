// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Paper, Typography, CircularProgress, Grid } from '@material-ui/core';

// Components
import Error from '../components/error';

// Apollo Queries
import { GET_LISTS_SHOW } from '../apolloclient/apolloqueries';

// Imported functions
import { pollMinute } from '../apolloclient/apolloclient';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    errorAndLoadingDiv: {
        paddingTop: '1em',
        display: 'flex',
        justifyContent: 'center'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsProfileHandle = props => {
    const { URLparam, classes } = props;
    return (
        <Query 
            query={GET_LISTS_SHOW}
            pollInterval={pollMinute(1000, 60)} 
            fetchPolicy='network-only'
            variables={{
                list_id: URLparam
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;                
                console.log(data)
                return (
                    <div>test</div>
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ListsProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
