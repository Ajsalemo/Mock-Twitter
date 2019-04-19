// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core/styles';

// Images
import verifiedIcon from '../images/verifiedicon.png';

// Components
import FollowUser from './followuser';
import UnfollowUser from './unfollowuser';
import { COMPARE_FRIENDSHIPS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    suggestedUsersGrid: {
        marginBottom: '1em',
        display: 'flex',
        flexDirection: 'row'
    },
    suggestedUsersNameContainer: {
        marginLeft: '0.4em',
        display: 'flex',
        flexDirection: 'column'
    },
    suggestUsersName: {
        '&:hover': {
            color: '#00acee',
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    suggestUsersScreenName: {
        fontWeight: '100',
        marginLeft: '0.3em'
    },
    verifiedIcon: {
        height: '1em',
        width: '1em',
        marginLeft: '0.4em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SuggestedUsers = props => {
    const { src, name, classes, verified, screen_name, id, currentUser } = props;
    return (
        <Query query={COMPARE_FRIENDSHIPS} variables={{ target_screenName: screen_name, source_screenName: currentUser}} fetchPolicy='cache-first'>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return console.log(error);

                return (
                    // Looping over the compared relationships
                    // These are to check if the user's account is following/not following the suggested Twitter accounts listed
                    Object.entries(data).map((info, i) => {
                        return (
                            <Grid item className={classes.suggestedUsersGrid} key={i}>
                                <Avatar alt={`${name} avatar`} src={src} />
                                <Typography variant="subtitle2" className={classes.suggestedUsersNameContainer}>
                                    <span className={classes.suggestUsersName}>
                                        {name}
                                        {/* If the Twitter account is verified - display the blue 'check' icon */}
                                        {verified === true 
                                            ? 
                                        <img src={verifiedIcon} className={classes.verifiedIcon} alt="verified account" />
                                            : 
                                        null}
                                        <span className={classes.suggestUsersScreenName}>@{screen_name}</span>
                                    </span>
                                    {/* If authenticated user is not following this account - give the user the option to follow them */}
                                    {info[1].compareRelationship.relationship.target.followed_by === true
                                            ? 
                                        <UnfollowUser 
                                            id={id}
                                            screen_name={screen_name}
                                            currentUser={currentUser}
                                        />
                                            :
                                        <FollowUser
                                            id={id}
                                            screen_name={screen_name}
                                            currentUser={currentUser}
                                        />
                                    }                                
                                </Typography>
                            </Grid>   
                        );        
                    })
                );
            }}
        </Query>             
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SuggestedUsers);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
