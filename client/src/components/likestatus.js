// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
 
import React from 'react';
import { Mutation } from 'react-apollo';

// * Material-UI components
import { FavoriteBorder } from '@material-ui/icons';
import { withStyles, CircularProgress } from '@material-ui/core';

// * Apollo Mutation and Queries
import { LIKE_STATUS, GET_AUTHUSER_TWEETS, GET_USERS_LIKES, GET_USERPROFILE_TWEETS, GET_LISTS_TIMELINE, SEARCH_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    likeStatusButtonSpacing: {
        marginRight: '2em'
    },
    likeStatusIcon: {
        fontSize: '1.3em',
        marginRight: '0.5em',
    }
});

// ----------------------------------------------------------------------------------------------------- //

const LikeStatus = props => {
    const { id, favorite_count, classes, screenName, list_id, searchQueryParam } = props;
    return (
        <Mutation
            mutation={LIKE_STATUS}
            refetchQueries={[ 
                // * If list_id is being passed in the fire this query
                // * Else if it isn't refetch the rest - this is to prevent any errors from twitters API and Apollo
                // * Since list_id is a required string
                list_id !== undefined ? 
                {
                    query: GET_LISTS_TIMELINE,
                    variables: {
                        list_id: list_id
                    }
                } 
                    :
                searchQueryParam !== undefined ?
                {
                    query: SEARCH_TWEETS,
                    variables: {
                        query: searchQueryParam
                    }
                }
                    :
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
            {(likeStatusProp, { loading }) => (
                loading
                    ?
                <CircularProgress />
                    :
                <React.Fragment>
                    <FavoriteBorder 
                        className={classes.likeStatusIcon} 
                        onClick={() => likeStatusProp({
                            variables: {
                                id: id
                            }
                        })}
                    />
                    <div className={classes.likeStatusButtonSpacing}>{favorite_count}</div>
                </React.Fragment>
            )}
        </Mutation>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(LikeStatus);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
