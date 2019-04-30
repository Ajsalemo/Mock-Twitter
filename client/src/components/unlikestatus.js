// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
 
import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import Favorite from '@material-ui/icons/Favorite';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Apollo Queries
import { UNLIKE_STATUS, GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    unlikeStatusButtonSpacing: {
        marginRight: '2em'
    },
    unlikeStatusIcon: {
        fontSize: '1.3em',
        marginRight: '0.5em',
    }
});

// ----------------------------------------------------------------------------------------------------- //

const UnLikeStatus = props => {
    const { id, favorite_count, classes } = props;
    return (
        <Mutation
            mutation={UNLIKE_STATUS}
            refetchQueries={[{
                query: GET_AUTHUSER_TWEETS
            }]}
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
