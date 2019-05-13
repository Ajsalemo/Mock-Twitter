 // --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import Button from '@material-ui/core/Button';
import classNames from 'classnames';

// Material-UI components
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    twitterAvatar: {
        width: 30,
        height: 30,
        '&:hover': {
            cursor: 'pointer'
        },
    },
    avatarMediaQuery: {
        margin: '0em 0.3em',
        [theme.breakpoints.down(889)]: {
            display: 'none'
        }
    },
    profileAvatarTooltip: {
        backgroundColor: '#000'
    },
    profileAvatarButton: {
        color: '#fff',
        padding: '0',
        fontSize: '1em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileAvatarModal = props => {
    const { classes, avatarImg } = props;
    return (
        <Tooltip
            title={
                <Button 
                    className={classes.profileAvatarButton}
                >
                    Profile and settings
                </Button>
            }
            classes={{
                tooltip: classes.profileAvatarTooltip
            }}
        >
            <Avatar alt="twitter avatar" src={avatarImg} className={classNames(classes.twitterAvatar, classes.avatarMediaQuery)} /> 
        </Tooltip>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileAvatarModal);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
