// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

// * Material-UI components
import { withStyles, Paper, Typography, CircularProgress, Grid, Card, CardContent, Avatar } from '@material-ui/core';

// * Components
import Error from '../components/error';
import SubscribeListButton from '../components/subscribelistbutton';
import UnsubscribeListButton from '../components/unsubscribelistbutton';

// * Apollo Queries
import { GET_LISTS_SHOW } from '../apolloclient/apolloqueries';

// * Imported functions
import { pollMinute } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    errorAndLoadingDiv: {
        paddingTop: '1em',
        display: 'flex',
        justifyContent: 'center'
    },
    listsProfileCard: {
        borderRadius: '0%',
        display: 'flex',
        flexDirection: 'row'
    },
    listsProfileOwner: {
        fontSize: '0.85em',
        fontWeight: '150'
    },
    listsProfileLink: {
        textDecoration: 'none',
        paddingLeft: '0.2em',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    listsProfileLineHeight: {
        lineHeight: '1em'
    },
    listProfileUserCountGrid: {
        display: 'flex',
        justifyContent: 'space-between',
        paddingTop: '1em'
    },
    listsProfileUserCountColor: {
        color: 'blue'
    },
    listsProfileAvatarGrid: {
        padding: '1em 1em 1em 0em'
    },
    cardContentRoot: {
        padding: '1em 0em 1em 1em'
    },
    listsProfilePaper: {
        height: 'fit-content'
    },
    listProfileButtonGrid: {
        paddingTop: '0.5em',
        borderTop: '1px solid #8080804f'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsProfileHandle = props => {
    const { URLparam, classes, currentUser, profileLinkColor, darkModeFont, darkModeBorder, darkModeComponentBackground } = props;
    return (
        <Query 
            query={GET_LISTS_SHOW}
            pollInterval={pollMinute(1000, 30)} 
            fetchPolicy='network-only'
            variables={{
                list_id: URLparam
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;                
                return (
                    // ! Inline styles are used for dark mode 
                    <Paper className={classes.listsProfilePaper} style={{ border: darkModeBorder }}>
                        <Card className={classes.listsProfileCard}>
                            <CardContent classes={{ root: classes.cardContentRoot }} style={{ backgroundColor: darkModeComponentBackground }}>
                                <Typography variant="h6" className={classes.listsProfileLineHeight} style={{ color: darkModeFont }}>
                                    {data.currentUser.getListsShow.name}
                                </Typography>
                                {/* // ! Inline styles are used for dark mode */}
                                <Typography variant="subtitle2" gutterBottom className={classes.listsProfileOwner} style={{ color: darkModeFont }}>
                                    {/* // * If the list is public, display that it is - else if it doesn't show that it's private */}
                                    {data.currentUser.getListsShow.mode === "public"
                                        ?
                                    // ! Inline styles are used for dark mode
                                    <span style={{ color: darkModeFont }}>
                                        A public list by 
                                        <Link to={`/userprofile/${data.currentUser.getListsShow.user.screen_name}`} className={classes.listsProfileLink} style={{ color: darkModeFont }}>
                                            {data.currentUser.getListsShow.user.screen_name}
                                        </Link>
                                    </span>
                                        :
                                    <span>
                                        A private list by 
                                        <Link to={`/userprofile/${data.currentUser.getListsShow.user.screen_name}`} className={classes.listsProfileLink}>
                                            {data.currentUser.getListsShow.user.screen_name}
                                        </Link>
                                    </span>}
                                </Typography>
                                {/* // ! Inline styles are used for dark mode */}
                                <Typography variant="subtitle2" className={classes.listsProfileOwner} style={{ color: darkModeFont }}>
                                    {data.currentUser.getListsShow.description}
                                </Typography>
                                <Grid item className={classes.listProfileUserCountGrid}>
                                    <Grid item>
                                        {/* // ! Inline styles are used for dark mode */}
                                        <Typography variant="subtitle2" style={{ color: darkModeFont }}>
                                            Members
                                        </Typography>
                                        {/* // ! Inline styles are used for dark mode */}
                                        <Typography 
                                            variant="subtitle2" 
                                            className={classes.listsProfileUserCountColor}
                                            style={{ color: darkModeFont ? darkModeFont : `#${profileLinkColor}` }}
                                        >
                                            {data.currentUser.getListsShow.member_count}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        {/* // ! Inline styles are used for dark mode */}
                                        <Typography variant="subtitle2" style={{ color: darkModeFont }}>
                                            Subscribers
                                        </Typography>
                                        {/* // ! Inline styles are used for dark mode */}
                                        <Typography 
                                            variant="subtitle2" 
                                            className={classes.listsProfileUserCountColor}
                                            style={{ color: darkModeFont ? darkModeFont : `#${profileLinkColor}` }}
                                        >
                                            {data.currentUser.getListsShow.subscriber_count}
                                        </Typography>
                                    </Grid>
                                </Grid>
                                <Grid className={classes.listProfileButtonGrid}>
                                    {/* // * If the authenticated user is already subscribed, show the Unsubscribe list button - else show the Subscribe button */}
                                    {data.currentUser.getListsShow.following === true
                                        ?
                                    <UnsubscribeListButton 
                                        list_id={URLparam}
                                        currentUser={currentUser}
                                        profileLinkColor={profileLinkColor}
                                    />
                                        :
                                    <SubscribeListButton
                                        list_id={URLparam}
                                        currentUser={currentUser}
                                    />
                                    }
                                </Grid>
                            </CardContent>
                            {/* // ! Inline styles are used for dark mode */}
                            <Grid className={classes.listsProfileAvatarGrid} style={{ backgroundColor: darkModeComponentBackground }}>
                                <Link to={`/userprofile/${data.currentUser.getListsShow.user.screen_name}`}>
                                    <Avatar src={data.currentUser.getListsShow.user.profile_image_url_https} alt={`${data.currentUser.getListsShow.user.screen_name} avatar`}/>
                                </Link>
                            </Grid>
                        </Card>
                    </Paper>
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ListsProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
