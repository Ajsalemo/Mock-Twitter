// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { Button, ClickAwayListener, Grow, Paper, Popper, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

// Components
import EditPostsMenuList from './editpostsmenulist';

// Apollo Query
import { GET_USER } from '../apolloclient/apolloqueries';

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
        const { classes, id, tweetUserId } = this.props;
        const { open } = this.state;
        return (
            <Query query={GET_USER}>
                {({ loading, error, data }) => {
                    return (
                        <React.Fragment>
                            {tweetUserId === data.currentUser.id
                                ?
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
                                                <EditPostsMenuList 
                                                    // Passed in from 'tweettext.js'
                                                    id={id}
                                                    handleClose={this.handleClose}
                                                />
                                            </ClickAwayListener>
                                        </Paper>
                                    </Grow>
                                    )}
                                </Popper>
                            </React.Fragment>   
                                :
                            null}
                        </React.Fragment>     
                    );
                }}
            </Query>
        );

    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(EditPost);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
