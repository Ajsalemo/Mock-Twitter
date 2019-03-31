// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import Avatar from '@material-ui/core/Avatar';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

// Images
import verifiedIcon from '../images/verifiedicon.png';

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
    },
    followUserButton: {
        backgroundColor: '#fff',
        color: '#00acee',
        height: '2em',
        width: '5em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SuggestedUsers = props => {
    const { src, name, classes, verified, screen_name } = props;
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
                <Fab 
                    variant="extended" 
                    aria-label="Follow user"
                    classes={{
                        root: classes.followUserButton
                    }}
                >
                    Follow
                </Fab>
            </Typography>
        </Grid>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(SuggestedUsers);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
