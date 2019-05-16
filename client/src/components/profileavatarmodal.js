// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import classNames from 'classnames';

// Material-UI components
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import PersonOutline from '@material-ui/icons/PersonOutline';
import Tooltip from '@material-ui/core/Tooltip';
import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Paper from '@material-ui/core/Paper';
import Popper from '@material-ui/core/Popper';
import MenuItem from '@material-ui/core/MenuItem';
import MenuList from '@material-ui/core/MenuList';
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core/styles';

// Auth0
import auth from '../auth';

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
    },
    menuHandleTextUpper: {
        wordBreak: 'break-word',
        display: 'block'
    },
    menuHandleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '1em'
    },
    menuUpperText: {
        marginRight: '1em'
    },
    menuDivider: {
        borderBottom: '1px solid #80808026'
    },
    menuPersonOutline: {
        color: '#000',
        marginRight: '0.8em'
    },
    profileMenuGrid: {
        display: 'flex',
        justifyContent: 'space-around'
    },
    profileChildMenuGrid: {
        borderBottom: '1px solid #80808026',
        '&:hover': {
            backgroundColor: '#00acee'
        }
    },
    profileChildMenuGridText: {
        '&:hover': {
            color: '#fff'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

class ProfileAvatarModal extends Component {
    state = {
        open: false
    };

    handleToggle = () => {
        this.setState({ 
            open: true 
        });
    };

    handleClose = () => {
        this.setState({ 
            open: false 
        });
    };

    // ----------------------------------------------------------------------------------------------------- //

    render() {
        const { classes, avatarImg, name, nickname } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <Tooltip
                    title={
                        <Button
                            className={classes.profileAvatarButton}
                            buttonRef={node => {
                                this.anchorEl = node;
                            }}    
                        >
                            Profile and settings
                        </Button>
                    }
                    classes={{
                        tooltip: classes.profileAvatarTooltip
                    }}
                >
                    <Avatar 
                        alt="twitter avatar" 
                        src={avatarImg} 
                        className={classNames(classes.twitterAvatar, classes.avatarMediaQuery)} 
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                    />
                </Tooltip>
                    <Popper open={open} anchorEl={this.anchorEl} transition disablePortal>
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
                                        <MenuItem onClick={this.handleClose} className={classes.menuDivider}>
                                            <Typography variant="subtitle2" className={classes.menuUpperText}>
                                                <div className={classes.handleTextUpperDiv}>
                                                    <span className={classes.menuHandleTextUpper}>{name}</span>
                                                    <span className={classes.menuHandleTextLower}>@{nickname}</span>
                                                </div>
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classNames(classes.menuDivider, classes.profileChildMenuGrid, classes.menuPersonOutline)}>
                                            <PersonOutline className={classes.menuPersonOutline} />
                                            <Typography variant="subtitle1" className={classes.profileChildMenuGridText}>
                                                Profile
                                            </Typography>
                                        </MenuItem>
                                        <MenuItem onClick={this.handleClose} className={classNames(classes.menuDivider, classes.profileChildMenuGrid)}>
                                            <Typography variant="subtitle1" className={classes.profileChildMenuGridText} onClick={() => auth.logout()}>
                                                Log Out @{nickname}
                                            </Typography>
                                        </MenuItem>
                                    </MenuList>
                                </ClickAwayListener>
                            </Paper>
                        </Grow>
                    )}
                </Popper>
            </React.Fragment>
        );

    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileAvatarModal);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
