// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import Grid from '@material-ui/core/Grid';
import { withStyles } from '@material-ui/core/styles';

// Apollo Queries
import { GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({

});

// ----------------------------------------------------------------------------------------------------- //

const PublicProfileBanner = props => {
    const { classes, URLparam } = props;
    console.log(`${URLparam} has been passed down from PublicProfile parent component`);
    return (
        <Query 
            query={GET_USERPROFILE_TWEETS}
            fetchPolicy='cache-and-network'
            variables={{
                screen_name: URLparam
            }}
        >
            {({ loading, error, data }) => {
                console.log(data)
                return (
                    <Grid item>
                        
                    </Grid>
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(PublicProfileBanner);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
