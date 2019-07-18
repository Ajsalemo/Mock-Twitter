// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
 
import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { Favorite } from '@material-ui/icons';
import { withStyles, CircularProgress } from '@material-ui/core';

// Apollo Queries
import { UNLIKE_STATUS, GET_AUTHUSER_TWEETS, GET_USERPROFILE_TWEETS, GET_LISTS_TIMELINE, GET_USERS_LIKES } from '../apolloclient/apolloqueries';

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
    const { id, favorite_count, classes, screenName, list_id } = props;
    return (
        <Mutation
            mutation={UNLIKE_STATUS}
            refetchQueries={[
                // If list_id is being passed in the fire this query
                // Else if it isn't refetch the rest - this is to prevent any errors from twitters API and Apollo
                // Since list_id is a required string
                list_id !== undefined ? 
                {
                    query: GET_LISTS_TIMELINE,
                    variables: {
                        list_id: list_id
                    }
                } :
                { 
                    query: GET_AUTHUSER_TWEETS 
                },
                {
                    query: GET_USERPROFILE_TWEETS,
                    variables: {
                        screen_name: screenName
                    }
                },
                {
                    query: GET_USERS_LIKES,
                    variables: {
                        screen_name: screenName
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
