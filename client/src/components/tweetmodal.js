// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';

// Material-UI components
import Modal from '@material-ui/core/Modal';
import Fab from '@material-ui/core/Fab';
import { withStyles } from '@material-ui/core/styles';

// Components
import TweetModalBody from './tweetmodalbody';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    tweetButton: {
        backgroundColor: '#00acee',
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
  
    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Fab 
                    size="small" 
                    variant="extended" 
                    aria-label="Add Tweet" 
                    className={classes.tweetButton}
                    onClick={this.handleOpen}
                >
                    Tweet
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
