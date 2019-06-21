// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';

// Components
import Login from '../../components/login';

// Material-UI components
import { withStyles, Grid, Typography, Avatar, Fab, AppBar, Toolbar } from '@material-ui/core';
import { Search, PeopleOutline, ChatBubbleOutline } from '@material-ui/icons';

// Image
import twitterlogo from '../../images/twitterlogo.jpg';
import twitterminilogo from '../../images/twitterminilogo.png';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    gridOne: {
        backgroundColor: '#00acee',
        background: `url(${twitterlogo}) no-repeat`,
        backgroundPositionX: '9em',
        backgroundPositionY: 'center',
        backgroundSize: '150%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: '1em'
    },
    gridTwo: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75%',
        padding: '1em'
    },
    leftColumnFont: {
        color: '#fff',
        letterSpacing: '0.1px',
        fontWeight: '500'
    },
    rightColumnFont: {
        color: '#000',
        letterSpacing: '0.1px',
        fontWeight: '600'
    },
    rightColumnFontMargin: {
        marginBottom: '2em'
    },
    twitterAvatar: {
        width: 80,
        height: 80,
        paddingRight: '1em'
    },
    button: {
        width: '100%',
        height: '2.5em',
        margin: '0.5em 0'
    },
    logInButton: {
        backgroundColor: '#00acee',
        color: '#fff'
    },
    signInButton: {
        backgroundColor: '#fff',
        color: '#00acee',
        border: '1px solid #00acee',
        '&:hover': {
            backgroundColor: '#d2d2d252'
        }
    },
    appBar: {
        top: 'auto',
        bottom: 0,
        height: '2.7em',
        backgroundColor: '#fff'
    },
    mediaGrid: {
        padding: '1em',
        height: '100vh',
        [theme.breakpoints.up(508)]: {
            padding: '0',
            display: 'flex',
            flexFlow: 'row-reverse',
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Home = props => {
    const { classes } = props;
    return (
        <Grid container className={classes.mediaGrid}>
            {/* --------------------------------------------- Log in/ Sign up buttons ---------------------------------------------- */}
            <Grid item xs={12}>
                <Login />
                <Grid item className={classes.gridTwo}>
                    <Grid item md={4}>
                        <Avatar alt="twitter logo" src={twitterminilogo} className={classes.twitterAvatar} /> 
                        <Typography variant="h5" gutterBottom className={classNames(classes.rightColumnFont, classes.rightColumnFontMargin)}>
                            See whats happening in the world right now
                        </Typography>
                        <Typography variant="h6" gutterBottom className={classes.rightColumnFont}>
                            Join Twitter today.
                        </Typography>
                        <Fab
                            aria-label="Sign Up"
                            className={classNames(classes.button, classes.logInButton)}
                            variant="extended"
                        >
                            Sign up
                        </Fab>
                        <Fab
                            variant="extended"
                            aria-label="Log In"
                            className={classNames(classes.button, classes.signInButton)}
                        >
                            Log in
                        </Fab>
                    </Grid>
                </Grid>
                {/* ---------------------------------------------------------------------------------------------------------------------- */}
            </Grid>
            <Grid item xs={12} className={classes.gridOne}>
                <Grid item>
                    <Typography variant="h6" gutterBottom className={classes.leftColumnFont}>
                            <Search style={{marginRight: '0.2em'}} />Follow your interests
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.leftColumnFont}>
                            <PeopleOutline style={{marginRight: '0.2em'}} />Hear what people are talking about
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.leftColumnFont}>
                            <ChatBubbleOutline style={{marginRight: '0.2em'}} />Join the conversation
                    </Typography>
                </Grid>
            </Grid>
            <AppBar className={classes.appBar} position="fixed">
                <Toolbar>
                    {/* Future footer links */}
                </Toolbar>
            </AppBar>
        </Grid>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Home);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
