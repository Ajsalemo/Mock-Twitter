// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';

// Material-UI components
import { Button, Avatar, Tooltip, ClickAwayListener, Grow, Paper, Popper, MenuItem, MenuList, Typography, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    dropdownIcon: {
        color: 'gray'
    }
});

// ----------------------------------------------------------------------------------------------------- //

class EditPost extends Component {
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
        const { classes } = this.props;
        const { open } = this.state;
        return (
            <React.Fragment>
                <Button 
                    buttonRef={node => {
                            this.anchorEl = node;
                    }}
                    className={classes.buttonRefClass}
                >
                    <ExpandMore
                        aria-owns={open ? 'menu-list-grow' : undefined}
                        aria-haspopup="true"
                        onClick={this.handleToggle}
                        className={classes.dropdownIcon}
                    />
                </Button>
                    <Popper 
                        open={open} 
                        anchorEl={this.anchorEl} 
                        transition 
                        disablePortal
                        className={classes.popperRootClass}
                    >
                        {({ TransitionProps, placement }) => (
                            <Grow
                                {...TransitionProps}
                                id="menu-list-grow"
                                style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                            >
                            <Paper>
                                <ClickAwayListener onClickAway={this.handleClose}>
                                    <MenuList>
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

export default withStyles(styles)(EditPost);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
