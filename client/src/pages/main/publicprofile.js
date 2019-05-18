// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { withRouter } from 'react-router';

// Components
import Navbar from '../../components/navbar';
import { GET_USERPROFILE_TWEETS } from '../../apolloclient/apolloqueries';

// Imported functions
import { pollMinute } from '../../apolloclient/apolloclient';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const PublicProfile = props => {
    const param = props.match.params.params; 
    console.log(param);
    return (
        <React.Fragment>
            <Navbar /> 
            <Query 
                query={GET_USERPROFILE_TWEETS}
                pollInterval={pollMinute(1000, 60)} 
                fetchPolicy='cache-and-network'
                variables={{
                    screen_name: param
                }}
            >
                {({ loading, error, data }) => {
                    console.log(data)
                    return (
                        <div>test</div>
                    );
                }}
            </Query>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withRouter(PublicProfile);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
