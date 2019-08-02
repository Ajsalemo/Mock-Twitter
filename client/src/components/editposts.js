// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// * Material-UI components
import { Button, ClickAwayListener, Grow, Paper, Popper, withStyles } from '@material-ui/core';
import { ExpandMore } from '@material-ui/icons';

// * Components
import EditPostsMenuList from './editpostsmenulist';

// * Apollo Query
import { VERIFY_USER } from '../apolloclient/apolloqueries';

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
        const { classes, id, tweetUserId, darkModeFont, dark_mode } = this.props;
        const { open } = this.state;
        return (
            <Query query={VERIFY_USER}>
                {({ loading, error, data }) => {
                    return (
                        <React.Fragment>
                            {/* // * If the tweet author ID matches the authenticated user's ID, let the user be able to delete the post */}
                            {tweetUserId === data.currentUser.verifyCredentials.id
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
                                        // ! Inline styles are used for dark mode
                                        style={{ color: darkModeFont }}
                                    />
                                </Button>
                                <Popper 
                                    open={open} 
                                    anchorEl={this.anchorEl} 
                                    transition 
                                    disablePortal
                                >
                                    {({ TransitionProps, placement }) => (
                                    <Grow
                                        {...TransitionProps}
                                        id="menu-list-grow"
                                        style={{ transformOrigin: placement === 'bottom' ? 'center top' : 'center bottom' }}
                                    >
                                        <Paper style={{ backgroundColor: dark_mode ? '#000000d6' : null }}>
                                            <ClickAwayListener onClickAway={this.handleClose}>
                                                <EditPostsMenuList 
                                                    //* Passed in from 'tweettext.js'
                                                    id={id}
                                                    handleClose={this.handleClose}
                                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                                    dark_mode={dark_mode}
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

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    };
};

// ----------------------------------------------------------------------------------------------------- //

EditPost = connect(
    mapStateToProps
)(EditPost);

// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(EditPost);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
