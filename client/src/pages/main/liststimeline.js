// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { connect } from 'react-redux';

// * Material-UI components
import { withStyles, Grid, CircularProgress } from '@material-ui/core';

// * Components
import Navbar from '../../components/navbar';
import Trending from '../../components/trending';
import ListsTimelineComponent from '../../components/liststimelinecomponent';
import ListsProfileHandle from '../../components/listsprofilehandle';

// * Pages
import NotFound from './notfound';

// * Apollo Query
import { VERIFY_USER, SHOW_USER } from '../../apolloclient/apolloqueries';

// * Helper function
import { changeGridBackground, fontColorChange, changeComponentBackground, changeBorder } from '../../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    listsTimelineContainer: {
        padding: '5em 1em 2em 1em',
        display: 'flex',
        justifyContent: 'space-around',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
            paddingTop: '4em'
        },
        [theme.breakpoints.up('md')]: {
            justifyContent: 'center'
        }
    },
    listsTimelineGrid: {
        display: 'flex',
        justifyContent: 'center',
        margin: '1em 2em 0em 2em',
        [theme.breakpoints.up('md')]: {
            marginRight: '3.5em'
        }
    },
    listsTimelineTrend: {
        margin: '-0.1em 2em 0em 2em',
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'initial'
        }
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

let ListsTimeline = props => {
    const { classes, dark_mode } = props;
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
                            if (loadingOne || loadingTwo) return <div className={classes.errorAndLoadingDiv} style={{ backgroundColor: changeGridBackground(dark_mode) }}><CircularProgress /></div>;
                            if (errorOne || errorTwo) return <div><NotFound /></div>;
                            return (
                                <React.Fragment>
                                    <Navbar 
                                        profileLinkColor={one.currentUser.showUser.profile_link_color}
                                        avatarImg={two.currentUser.verifyCredentials.profile_image_url_https}
                                        name={two.currentUser.verifyCredentials.name}
                                        screenName={two.currentUser.verifyCredentials.screen_name}
                                        darkModeBorder={changeBorder(dark_mode)}
                                        darkModeFont={fontColorChange(dark_mode)}
                                        darkModeComponentBackground={changeComponentBackground(dark_mode)}            
                                    />
                                    <Grid container className={classes.listsTimelineContainer} style={{ backgroundColor: changeGridBackground(dark_mode) }}>
                                        <Grid item xs={8} sm={2} md={2} className={classes.listsTimelineGrid}>
                                            <ListsProfileHandle 
                                                URLparam={param}
                                                currentUser={two.currentUser.verifyCredentials.screen_name}
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                                darkModeFont={fontColorChange(dark_mode)}
                                                darkModeBorder={changeBorder(dark_mode)}
                                                darkModeComponentBackground={changeComponentBackground(dark_mode)}            
                                            />
                                        </Grid>
                                        <Grid item sm={7} md={4} className={classes.listsTimelineGridMain}>
                                            <ListsTimelineComponent
                                                URLparam={param}
                                                currentUser={two.currentUser.verifyCredentials.screen_name}
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                                darkModeFont={fontColorChange(dark_mode)}
                                                darkModeBorder={changeBorder(dark_mode)}
                                                darkModeComponentBackground={changeComponentBackground(dark_mode)}            
                                            />
                                        </Grid>
                                        <Grid item xs={8} sm={8} md={2} className={classes.listsTimelineTrend}>
                                            <Trending 
                                                profileLinkColor={one.currentUser.showUser.profile_link_color}
                                                darkModeBorder={changeBorder(dark_mode)}
                                                darkModeFont={fontColorChange(dark_mode)}
                                                darkModeComponentBackground={changeComponentBackground(dark_mode)}            
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

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
  };
};

// ----------------------------------------------------------------------------------------------------- //

ListsTimeline = connect(
    mapStateToProps
)(ListsTimeline);

// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ListsTimeline);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
