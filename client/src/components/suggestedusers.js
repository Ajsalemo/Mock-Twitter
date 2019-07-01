// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Avatar, Grid, Typography, CircularProgress } from '@material-ui/core';

// Images
import verifiedIcon from '../images/verifiedicon.png';

// Components
import FollowUser from './followuser';
import UnfollowUser from './unfollowuser';
import Error from './error';

// Apollo Queries
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
        marginLeft: '0.3em',
        textDecoration: 'none',
        color: '#000'
    },
    suggestUsersNameMain: {
        textDecoration: 'none',
        color: '#000',
        '&:hover': {
            color: '#00acee'
        }
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
        <Query 
            query={COMPARE_FRIENDSHIPS} 
            variables={{ target_screenName: screen_name, source_screenName: currentUser }}
            fetchPolicy='cache-and-network'
        >
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />;

                return (
                    // Looping over the compared relationships
                    // These are to check if the user's account is following/not following the suggested Twitter accounts listed
                    Object.entries(data).map((info, i) => {
                        return (
                            <Grid item className={classes.suggestedUsersGrid} key={i}>
                                <Avatar alt={`${name} avatar`} src={src} />
                                <Typography variant="subtitle2" className={classes.suggestedUsersNameContainer}>
                                    <span className={classes.suggestUsersName}>
                                        <Link to={`/userprofile/${screen_name}`} className={classes.suggestUsersNameMain}> {name}</Link>
                                        {/* If the Twitter account is verified - display the blue 'check' icon */}
                                        {verified === true 
                                            ? 
                                        <img src={verifiedIcon} className={classes.verifiedIcon} alt="verified account" />
                                            : 
                                        null}
                                        <Link to={`/userprofile/${screen_name}`} className={classes.suggestUsersScreenName}>@{screen_name}</Link>
                                    </span>
                                    {/* If authenticated user is not following this account - give the user the option to follow them */}
                                    {info[1].compareRelationship.relationship.target.followed_by === true
                                            ? 
                                        <UnfollowUser 
                                            id={id}
                                            screen_name={screen_name}
                                            // This is passed from 'suggestedcategories.js'
                                            currentUser={currentUser}
                                        />
                                            :
                                        <FollowUser
                                            id={id}
                                            screen_name={screen_name}
                                            // This is passed from 'suggestedcategories.js'
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
