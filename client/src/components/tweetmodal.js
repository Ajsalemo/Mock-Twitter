// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';

// Material-UI components
import { withStyles, Fab, Modal } from '@material-ui/core';

// Components
import TweetModalBody from './tweetmodalbody';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    tweetButton: {
        height: '2.4em',
        width: 'max-content',
        padding: '0em 0.4em',
        color: '#fff',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    tweetModalRoot: {
        display: 'flex',
        justifyContent: 'center',
        height: 'fit-content',
        marginTop: '2em'
    },
    tweetButtonRoot: {
        width: 'max-content'
    }
});

// ----------------------------------------------------------------------------------------------------- //

class TweetModal extends Component {
    state = {
        open: false
    };
  
    handleOpen = () => {
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
        const { classes, userToReply, userScreenName, profileLinkColor, screenName, avatarImg } = this.props;
        return (
            <React.Fragment>
                <Fab 
                    variant="extended" 
                    aria-label="Add Tweet" 
                    className={classes.tweetButton}
                    onClick={this.handleOpen}
                    style={{ 
                        backgroundColor: `#${profileLinkColor}`
                    }}
                >
                    {userToReply ? `Tweet to ${userToReply}` : 'Tweet'}
                </Fab>
                <Modal
                    aria-labelledby="Modal Tweet window"
                    aria-describedby="A pop up modal to create tweets with"
                    open={this.state.open}
                    onClose={this.handleClose}
                    classes={{ 
                        root: classes.tweetModalRoot
                    }}
                >
                    <TweetModalBody 
                        onClose={this.handleClose}
                        profileLinkColor={profileLinkColor}
                        userScreenName={userScreenName}
                        screenName={screenName}
                        avatarImg={avatarImg}
                    />
                </Modal>
            </React.Fragment>
        );
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(TweetModal);  

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
