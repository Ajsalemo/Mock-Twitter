// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';

// Material-UI components
import Modal from '@material-ui/core/Modal';
import Repeat from '@material-ui/icons/Repeat';
import Close from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Avatar from '@material-ui/core/Avatar';
import { withStyles } from '@material-ui/core/styles';

// Components
import Tweettext from '../components/tweettext';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    retweetModalIcon: {
        fontSize: '1.3em',
        marginRight: '0.5em'
    },
    retweetModalButtonOptionsSpacing: {
        marginRight: '2em'
    },
    retweetModalRoot: {
        display: 'flex',
        justifyContent: 'center',
        height: 'fit-content',
        marginTop: '2em'
    },
    retweetModalPaper: {
        width: '40em',
        backgroundColor: '#fff'
    },
    retweetModalHeader: {
        fontWeight: '800',
        padding: '0.5em',
        fontSize: '1.1em',
        textAlign: 'center',
        flexBasis: '95%'
    },
    retweetModalGrid: {
        backgroundColor: '#f0f8ff',
        display: 'flex',
        flexDirection: 'column'
    },
    retweetModalTypographyGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    retweetCloseIcon: {
        flexBasis: '5%',
        alignSelf: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    retweetTimelineAvatar: {
        marginRight: '0.5em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

class RetweetModal extends Component {
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
        const { classes, retweet_count, name, verified, nickname, created_at, full_text, srcImage } = this.props;
        return ( 
            <React.Fragment>
                <Repeat 
                    className={classes.retweetModalIcon} 
                    onClick={this.handleOpen}
                /> 
                <div className={classes.retweetModalButtonOptionsSpacing}>{retweet_count}</div>
                <Modal
                    aria-labelledby="Retweet modal window"
                    aria-describedby="A pop up modal to retweet statuses"
                    open={this.state.open}
                    onClose={this.handleClose}
                    classes={{ 
                        root: classes.retweetModalRoot
                    }}
                >
                    <Paper className={classes.retweetModalPaper} tabIndex='-1'>
                        <Grid item className={classes.retweetModalTypographyGrid}>
                            <Typography variant="subtitle2" className={classes.retweetModalHeader}>
                                Retweet this to your followers?
                            </Typography>
                            <div onClick={this.handleClose} className={classes.retweetCloseIcon}>
                                <Close />
                            </div>
                        </Grid>
                        <Avatar alt="twitter avatar" src={srcImage} className={classes.retweetTimelineAvatar} />
                        <Grid item className={classes.retweetModalGrid}>
                            <Tweettext
                                name={name}
                                verified={verified}
                                nickname={nickname}
                                created_at={created_at}
                                full_text={full_text}
                            />
                        </Grid>
                    </Paper>
                </Modal>
            </React.Fragment>
        );
    }
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(RetweetModal);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
