// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
 
import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { FavoriteBorder } from '@material-ui/icons';
import { withStyles, CircularProgress } from '@material-ui/core';

// Apollo Mutation and Queries
import { LIKE_STATUS, GET_AUTHUSER_TWEETS, GET_USERS_LIKES, GET_USERPROFILE_TWEETS, GET_LISTS_TIMELINE } from '../apolloclient/apolloqueries';

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
    const { id, favorite_count, classes, screenName, retweetId } = props;
    return (
        <Mutation
            mutation={LIKE_STATUS}
            refetchQueries={[
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
                },
                {
                    query: GET_LISTS_TIMELINE,
                    variables: {
                        list_id: retweetId
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
