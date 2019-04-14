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

// Apollo Queries
import { GET_FRIENDSHIP_COMPARISONS } from '../apolloclient/apolloqueries';

// Components
import FollowUser from './followuser';

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
    const { src, name, classes, verified, screen_name, id } = props;
    return (
        <React.Fragment>
            <Query query={GET_FRIENDSHIP_COMPARISONS} variables={{ target_screenName: screen_name, source_screenName: 'Letterman Icon' }}>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) console.log(error);
                    console.log(data)
                    return (
                        <Grid item className={classes.suggestedUsersGrid}>
                            <Avatar alt={`${name} avatar`} src={src} />
                            <Typography variant="subtitle2" className={classes.suggestedUsersNameContainer}>
                                <span className={classes.suggestUsersName}>
                                    {name}
                                    {verified === true 
                                        ? 
                                    <img src={verifiedIcon} className={classes.verifiedIcon} alt="verified account" />
                                        : 
                                    null}
                                    <span className={classes.suggestUsersScreenName}>@{screen_name}</span>
                                </span>
                                {/* If authenticated user is not following this account - give the user the option to follow them */}
                                <FollowUser
                                    id={id}
                                />
                            </Typography>
                        </Grid>                
                    )
                }}
            </Query>
        </React.Fragment>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SuggestedUsers);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
