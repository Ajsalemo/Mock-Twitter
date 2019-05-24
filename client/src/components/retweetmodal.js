// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React, { Component } from 'react';
import { Mutation } from 'react-apollo';

// Material-UI components
import { Modal, Typography, Grid, Paper, Avatar, Fab, CircularProgress, withStyles } from '@material-ui/core';
import { Repeat, Close } from '@material-ui/icons';

// Components
import Tweettext from '../components/tweettext';
import Error from '../components/error';

// Apollo Queries and Mutations 
import { RETWEET_STATUS, GET_AUTHUSER_TWEETS, GET_USERPROFILE_TWEETS } from '../apolloclient/apolloqueries';

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
        flexBasis: '90%'
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
    },
    retweetBodyContainer: {
        display: 'flex',
        flexWrap: 'wrap',
        padding: '1em'
    },
    retweetButton: {
        backgroundColor: '#00acee',
        color: '#fff',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    retweetButtonGrid: {
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '0 1em 1em 1em'
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
        const { classes, retweet_count, name, verified, nickname, created_at, full_text, srcImage, id } = this.props;
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
                        <Grid container className={classes.retweetBodyContainer}>
                            <Grid item>
                                <Avatar alt="twitter avatar" src={srcImage} className={classes.retweetTimelineAvatar} />
                            </Grid>
                            <Grid item className={classes.retweetModalGrid}>
                                <Tweettext
                                    name={name}
                                    verified={verified}
                                    nickname={nickname}
                                    created_at={created_at}
                                    full_text={full_text}
                                />
                            </Grid>
                        </Grid>
                        <Grid item className={classes.retweetButtonGrid}>
                            <Mutation 
                                mutation={RETWEET_STATUS} 
                                refetchQueries={[{ query: GET_AUTHUSER_TWEETS }]}
                            >
                                {(retweetStatusProp, { loading }) => (
                                    loading 
                                        ?
                                    <CircularProgress />
                                        :
                                    <Fab 
                                        size="small" 
                                        variant="extended" 
                                        aria-label="Add Tweet" 
                                        className={classes.retweetButton}
                                        onClick={ async () => {
                                            try {
                                                await retweetStatusProp({
                                                    variables: {
                                                        id: id
                                                    }
                                                });
                                                // Closes the modal upon clicking the retweet button
                                                this.handleClose()
                                            } catch(error) {
                                                console.log(error);
                                                return <Error />;
                                            }
                                        }}
                                    >
                                        Retweet
                                    </Fab>
                                )}
                            </Mutation>
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
