// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { Repeat } from '@material-ui/icons';
import { withStyles, CircularProgress } from '@material-ui/core';

// Apollo Queries and Mutations
import { UNRETWEET_STATUS, GET_AUTHUSER_TWEETS, GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    destroyRetweetButton: {
        fontSize: '1.3em',
        marginRight: '0.5em',
        color: '#ff00009e'
    },
    destroyRetweetModalButtonSpacing: {
        marginRight: '2em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const UnRetweetStatus = props => {
    const { classes, id, retweet_count } = props;
    return (
        <Mutation 
            mutation={UNRETWEET_STATUS} 
            refetchQueries={[{
                query: GET_AUTHUSER_TWEETS
            }]}
        >
            {(unRetweetStatusProp, { loading }) => (
                loading
                    ?
                <CircularProgress />
                    :
                <React.Fragment>
                    <Repeat
                        className={classes.destroyRetweetButton}
                        onClick={() => unRetweetStatusProp({
                            variables: {
                                id: id
                            }
                        })}
                    />
                    <div className={classes.destroyRetweetModalButtonSpacing}>{retweet_count}</div>
                </React.Fragment>
            )}
        </Mutation>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(UnRetweetStatus);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //




