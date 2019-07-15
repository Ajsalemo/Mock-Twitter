// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Avatar, AppBar, Typography, Toolbar, TextField, InputAdornment,  CircularProgress } from '@material-ui/core';
import { Home, OfflineBolt, NotificationsNone, Message, Search } from '@material-ui/icons';

// Image
import twitterminilogo from '../images/twitterminilogo.png';

// Apollo Queries
import { VERIFY_USER } from '../apolloclient/apolloqueries';

// Components
import TweetModal from '../components/tweetmodal';
import Error from '../components/error';
import ProfileAvatarModal from '../components/profileavatarmodal';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    appBar: {
        backgroundColor: '#fff',
        height: '2.7em'
    },
    notificationDiv: {
        display: 'flex',
        paddingBottom: '0em',
        width: '25%',
        justifyContent: 'space-between',
        [theme.breakpoints.up(599)]: {
            paddingBottom: '0.6em'
        }
    },
    innerText: {
        verticalAlign: 'super',
        [theme.breakpoints.down(1413)]: {
            display: 'none'
        }
    },
    colorDefault: {
        textDecoration: 'none',
        color: 'gray',
        paddingBottom: '0em',
        '&:hover': {
            color: '#00acee',
            cursor: 'pointer',
            borderBottom: '2px solid #00acee'
        }
    },
    avatarDiv: {
        width: '25%',
        display: 'flex',
        justifyContent: 'center',
        paddingBottom: '0.5em',
        [theme.breakpoints.up(599)]: {
            paddingBottom: '1em'
        }
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
        marginTop: '0.5em',
        justifyContent: 'space-between',
        height: '3em',
        width: 'auto',
        paddingBottom: '1em',
        [theme.breakpoints.up(599)]: {
            marginTop: '0',
            paddingBottom: '1em'
        }
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
    },
    navAnchor: {
        paddingTop: '0.3em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Navbar = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Query 
                query={VERIFY_USER}
                fetchPolicy='network-only'
            >
                {({ loading, error, data }) => {
                    if (loading) return <div><CircularProgress /></div>;
                    if (error) return <div><Error /></div>;

                return (
                    <AppBar className={classes.appBar}>
                        <Toolbar className={classes.toolBar}>
                            <div className={classes.notificationDiv}>
                                <Typography variant="subtitle2" className={classes.navAnchor}>
                                    <Link to='/main' className={classes.colorDefault}>
                                        <Home /><span className={classes.innerText}>Home</span>
                                    </Link>
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
                                <ProfileAvatarModal
                                    avatarImg={data.currentUser.verifyCredentials.profile_image_url_https}
                                    name={data.currentUser.verifyCredentials.name}
                                    screen_name={data.currentUser.verifyCredentials.screen_name}
                                />
                                {/* Classes component for the modal to submit tweets */}
                                <TweetModal 
                                    profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                                />
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
