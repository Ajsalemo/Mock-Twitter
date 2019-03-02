// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Fab from '@material-ui/core/Fab';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import TextField from '@material-ui/core/TextField';
import Home from '@material-ui/icons/Home';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import Message from '@material-ui/icons/Message';
import Search from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

// Image
import twitterminilogo from '../images/twitterminilogo.png';
import avatar from '../images/avatar.png';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    appBar: {
        backgroundColor: '#fff',
        height: '2.7em'
    },
    notificationDiv: {
        display: 'flex',
        paddingBottom: '0.6em',
        width: '25%',
        justifyContent: 'space-between'
    },
    innerText: {
        verticalAlign: 'super',
        [theme.breakpoints.down(1413)]: {
            display: 'none'
        }
    },
    colorDefault: {
        color: 'gray',
        borderBottom: '3px solid #fff',
        '&:hover': {
            color: '#00acee',
            cursor: 'pointer',
            borderBottom: '3px solid #00acee'
        }
    },
    avatarDiv: {
        width: '25%',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '1em'
    },
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
    searchDiv: {
        display: 'flex',
        paddingBottom: '1em',
        justifyContent: 'space-between',
        height: '3em',
        width: 'auto'
    },
    searchIconColor: {
        color: 'gray',
        '&:hover': {
            cursor: 'pointer'
        }
    },
    tweetButton: {
        backgroundColor: '#00acee',
        color: '#fff'
    },
    toolBar: {
        justifyContent: 'center'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Navbar = props => {
    const { classes } = props;
    return (
        <AppBar className={classes.appBar}>
            <Toolbar className={classes.toolBar}>
                <div className={classes.notificationDiv}>
                    <Typography variant="subtitle2" className={classes.colorDefault}>
                        <Home /><span className={classes.innerText}>Home</span>
                    </Typography>
                    <Typography variant="subtitle2" className={classes.colorDefault}>
                        <OfflineBolt /><span className={classes.innerText}>Moments</span>
                    </Typography>
                    <Typography variant="subtitle2" className={classes.colorDefault}>
                        <NotificationsNone /><span className={classes.innerText}>Notifications</span>
                    </Typography>
                    <Typography variant="subtitle2" className={classes.colorDefault}>
                        <Message /><span className={classes.innerText}>Messages</span>
                    </Typography>
                </div>
                <div className={classes.avatarDiv}>
                    <Avatar alt="twitter logo" src={twitterminilogo} className={classes.twitterAvatar} /> 
                </div>
                <div className={classes.searchDiv}>
                    <TextField
                        placeholder="Search Twitter"
                        variant="outlined"
                        InputProps={{
                            endAdornment: (
                              <InputAdornment variant="filled" position="end">
                                <Search
                                  aria-label="Search form submit"
                                  classes={{
                                      root: classes.searchIconColor
                                  }}
                                >
                                </Search>
                              </InputAdornment>
                            )
                        }}
                    />
                    <Avatar alt="twitter avatar" src={avatar} className={classNames(classes.twitterAvatar, classes.avatarMediaQuery)} /> 
                    <Fab size="small" variant="extended" aria-label="Add Tweet" className={classes.tweetButton}>
                        Tweet
                    </Fab>
                </div>
            </Toolbar>
        </AppBar>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Navbar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
