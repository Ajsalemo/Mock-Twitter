// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// * Material-UI components
import { withStyles, Grid, Paper, Typography, CircularProgress } from '@material-ui/core';

// * Components
import Error from '../components/error';
import EmptyTweetMessage from '../components/emptytweetsmessage';

// * Apollo Query
import { GET_USER_LISTS } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    listsComponentPaper: {
        display: 'flex',
        flexDirection: 'column',
        padding: '1em 0',
        wordBreak: 'break-word',
        borderRadius: '0%',
        '&:hover': {
            backgroundColor: '#8080801f',
            cursor: 'pointer'
        }
    },
    listsComponentFontGrid: {
        borderBottom: '1px solid gray',
        width: '100%',
        paddingLeft: '0.7em'
    },
    listsComponentDataGrid: {
        paddingLeft: '0.7em'
    },
    listsComponentSpan: {
        color: '#6a6a6a',
        display: 'block',
        fontSize: '1em',
        fontWeight: '200',
        paddingLeft: '0.4em'
    },
    listComponentDataTypography: {
        display: 'flex',
        margin: '1em 0'
    },
    listsComponentLink: {
        textDecoration: 'none',
        color: 'inherit',
        paddingLeft: '0.4em',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    listsComponentSpanMembers: {
        color: '#6a6a6a',
        display: 'inline',
        fontSize: '1em',
        fontWeight: '200',
        paddingRight: '0.4em'
    },
    listsComponentName: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    textPlacement: {
        textAlign: 'center'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsComponent = props => {
    const { classes, screenName, profileLinkColor, darkModeFont, darkModeComponentBackground } = props;
    return (
        <Query 
            query={GET_USER_LISTS}
            variables={{
                screen_name: screenName
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <div><Error /></div>;    
                return (
                    /** 
                     *   * This ternary checks to see if a user has subscribed to any Lists
                     *   * If they haven't, this will display a message - else it'll display what the user has subscribed to
                     */
                    // ! query.length checks to see if there is values being returned, if the values are empty a placeholder will be displayed
                    data.currentUser.getLists.length ? 
                        <Paper className={classes.listsComponentPaper} style={{ backgroundColor: darkModeComponentBackground }}>
                            <Grid className={classes.listsComponentFontGrid}>
                                <Typography variant="h6">
                                    {/* // ! This inline style dictates what the user's color theme is set to */}
                                    <span style={{ color: darkModeFont ? darkModeFont : `#${profileLinkColor}` }}>Subscribed to</span>
                                </Typography>
                            </Grid>
                            {
                                data.currentUser.getLists.map((lists, i) => {
                                    return (
                                        <Grid className={classes.listsComponentDataGrid} key={i}>
                                            <Typography variant="subtitle2" gutterBottom className={classes.listComponentDataTypography}>
                                                <Link 
                                                    to={`/lists-statuses/${lists.user.screen_name}/${lists.id}`} 
                                                    className={classes.listsComponentName}
                                                    // ! This inline style dictates what the user's color theme is set to
                                                    style={{ color: darkModeFont ? darkModeFont : `#${profileLinkColor}` }}
                                                >
                                                    {lists.name}
                                                </Link>
                                                {/* // ! This inline style dictates what the user's color theme is set to */}
                                                <span className={classes.listsComponentSpan} style={{ color: darkModeFont ? darkModeFont : `#${profileLinkColor}` }}>
                                                    by 
                                                    <Link to={`/userprofile/${lists.user.screen_name}`} className={classes.listsComponentLink}>
                                                        {lists.user.screen_name}
                                                    </Link>
                                                </span>
                                            </Typography>
                                            <Typography 
                                                variant="subtitle2" 
                                                gutterBottom 
                                                className={classes.listsComponentSpanMembers}
                                                // ! This inline style dictates what the user's color theme is set to
                                                style={{ color: darkModeFont ? darkModeFont : `#${profileLinkColor}` }}
                                            >
                                                <span>{lists.member_count}</span> members
                                            </Typography>
                                        </Grid>
                                    );
                                })
                            }
                        </Paper>
                        :
                    // ! If the associated profile hasn't subscribed to any lists, this placeholder will be displayed
                    <EmptyTweetMessage 
                        screenName={screenName}
                        text={"hasn't subscribed to any lists"}
                        profileLinkColor={profileLinkColor}
                        textPlacement={classes.textPlacement}
                    />
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ListsComponent);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
