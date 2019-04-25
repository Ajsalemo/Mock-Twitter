// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
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
import CircularProgress from '@material-ui/core/CircularProgress';

// Image
import twitterminilogo from '../images/twitterminilogo.png';

// Apollo Queries
import { GET_USER } from '../apolloclient/apolloqueries';

// Components
import TweetModal from '../components/tweetmodal';

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
    },
    navTextField: {
        height: '-webkit-fill-available'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Navbar = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query query={GET_USER}>
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) console.log(error);

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
                                        ),
                                        classes: {
                                            root: classes.navTextField
                                        }
                                    }}
                                />
                                <Avatar alt="twitter avatar" src={data.currentUser.picture} className={classNames(classes.twitterAvatar, classes.avatarMediaQuery)} /> 
                                {/* Classes component for the modal to submit tweets */}
                                <TweetModal />
                            </div>
                        </Toolbar>
                    </AppBar>
                    )
                }}
            </Query>
        </React.Fragment>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Navbar);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
