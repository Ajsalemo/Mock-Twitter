// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Mutation } from 'react-apollo';

// * Material-UI components
import { Repeat } from '@material-ui/icons';
import { withStyles, CircularProgress } from '@material-ui/core';

// * Apollo Queries and Mutations
import { UNRETWEET_STATUS, GET_AUTHUSER_TWEETS, GET_USERPROFILE_TWEETS, GET_USERS_LIKES, GET_LISTS_TIMELINE, SEARCH_TWEETS } from '../apolloclient/apolloqueries';

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
    const { classes, id, retweet_count, screenName, retweetId, searchQueryParam } = props;
    return (
        <Mutation 
            mutation={UNRETWEET_STATUS} 
            refetchQueries={[
                // * If retweetId is being passed in the fire this query
                // * Else if it isn't refetch the rest - this is to prevent any errors from twitters API and Apollo
                // * Since retweetId is a required string
                retweetId !== undefined ? 
                {
                    query: GET_LISTS_TIMELINE,
                    variables: {
                        list_id: retweetId
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




