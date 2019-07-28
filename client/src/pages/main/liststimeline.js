// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import Trending from '../../components/trending';
import ListsTimelineComponent from '../../components/liststimelinecomponent';
import ListsProfileHandle from '../../components/listsprofilehandle';

// Pages
import NotFound from './notfound';

// Apollo Query
import { VERIFY_USER, SHOW_USER } from '../../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    listsTimelineContainer: {
        width: 'auto',
        padding: '4em 2em 0 0',
        marginLeft: '10em'
    },
    listsTimelineGrid: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1em 2em 0em 2em'
    },
    listsTimelineGridMain: {
        marginTop: '1em'
    },
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsTimeline = props => {
    const { classes } = props;
    const param = props.match.params.params;
    const screenName = props.match.params.screen_name;
    return (
            <Query
                query={SHOW_USER}
                variables={{
                    screen_name: screenName
                }}
            >
                {({ loading: loadingOne, error: errorOne, data: one }) => (
                    <Query query={VERIFY_USER}>
                        {({ loading: loadingTwo, error: errorTwo, data: two }) => {
                            if (loadingOne || loadingTwo) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                            if (errorOne || errorTwo) return <div><NotFound /></div>;
                            return (
                                <React.Fragment>
                                    <Navbar 
                                        profileLinkColor={one.currentUser.showUser.profile_link_color}
                                        avatarImg={two.currentUser.verifyCredentials.profile_image_url_https}
                                        name={two.currentUser.verifyCredentials.name}
                                        screenName={two.currentUser.verifyCredentials.screen_name}
                                    />
                                    <Grid container className={classes.listsTimelineContainer}>
                                        <Grid item xs={8} sm={8} md={2} className={classes.listsTimelineGrid}>
                                            <ListsProfileHandle 
                                                URLparam={param}
                                                currentUser={two.currentUser.verifyCredentials.screen_name}
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                            />
                                        </Grid>
                                        <Grid item md={6} className={classes.listsTimelineGridMain}>
                                            <ListsTimelineComponent
                                                URLparam={param}
                                                currentUser={two.currentUser.verifyCredentials.screen_name}
                                            />
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={2} className={classes.listsTimelineGrid}>
                                            <Trending 
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                            />
                                        </Grid>
                                    </Grid>
                                </React.Fragment>
                            );
                        }}
                    </Query>
                )}
            </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ListsTimeline);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
