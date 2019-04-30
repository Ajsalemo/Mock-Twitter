// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
 
import React from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Apollo Queries
import { LIKE_STATUS, GET_AUTHUSER_TWEETS } from '../apolloclient/apolloqueries';

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
    const { id, favorite_count, classes } = props;
    return (
        <Mutation
            mutation={LIKE_STATUS}
            refetchQueries={[{
                query: GET_AUTHUSER_TWEETS
            }]}
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
                            },
                            update: (proxy, { data: { likeStatusProp }}) => {
                                console.log("Update: ", likeStatusProp);
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
