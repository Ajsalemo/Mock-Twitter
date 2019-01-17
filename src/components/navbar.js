// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import AppBar from '@material-ui/core/AppBar';
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import Home from '@material-ui/icons/Home';
import OfflineBolt from '@material-ui/icons/OfflineBolt';
import NotificationsNone from '@material-ui/icons/NotificationsNone';
import Message from '@material-ui/icons/Message';

// Image
import twitterminilogo from '../images/twitterminilogo.png';

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
        verticalAlign: 'super'
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
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Navbar = props => {
    const { classes } = props;
    return (
        <AppBar className={classes.appBar}>
            <Toolbar>
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
            </Toolbar>
        </AppBar>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Navbar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
