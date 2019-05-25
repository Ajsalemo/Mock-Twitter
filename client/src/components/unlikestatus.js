// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
 
import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { Favorite } from '@material-ui/icons';
import { withStyles, CircularProgress } from '@material-ui/core';

// Apollo Queries
import { UNLIKE_STATUS, GET_AUTHUSER_TWEETS, GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    unlikeStatusButtonSpacing: {
        marginRight: '2em'
    },
    unlikeStatusIcon: {
        fontSize: '1.3em',
        marginRight: '0.5em',
        color: '#8b000094'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const UnLikeStatus = props => {
    const { id, favorite_count, classes, URLparam } = props;
    return (
        <Mutation
            mutation={UNLIKE_STATUS}
            refetchQueries={[
                {
                    query: GET_AUTHUSER_TWEETS
                },
                {
                    query: GET_USERPROFILE_TWEETS,
                    variables: {
                        screen_name: URLparam
                    }
                }
            ]}
        >
            {(unlikeStatusProp, { loading }) => (
                loading
                    ?
                <CircularProgress />
                    :
                <React.Fragment>
                    <Favorite 
                        className={classes.unlikeStatusIcon} 
                        onClick={() => unlikeStatusProp({
                            variables: {
                                id: id
                            }
                        })}
                    />
                    <div className={classes.unlikeStatusButtonSpacing}>{favorite_count}</div>
                </React.Fragment>
            )}
        </Mutation>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(UnLikeStatus);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
