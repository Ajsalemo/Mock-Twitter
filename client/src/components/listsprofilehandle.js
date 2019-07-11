// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Paper, Typography, CircularProgress, Grid, Card, CardContent, Avatar } from '@material-ui/core';

// Components
import Error from '../components/error';

// Apollo Queries
import { GET_LISTS_SHOW } from '../apolloclient/apolloqueries';

// Imported functions
import { pollMinute } from '../apolloclient/apolloclient';

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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsProfileHandle = props => {
    const { URLparam, classes } = props;
    return (
        <Query 
            query={GET_LISTS_SHOW}
            pollInterval={pollMinute(1000, 60)} 
            fetchPolicy='network-only'
            variables={{
                list_id: URLparam
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;                
                console.log(data)
                return (
                    <Paper className={classes.listsProfilePaper}>
                        <Card className={classes.listsProfileCard}>
                            <CardContent classes={{
                                root: classes.cardContentRoot
                            }}>
                                <Typography variant="h6" className={classes.listsProfileLineHeight}>
                                    {data.currentUser.getListsShow.name}
                                </Typography>
                                <Typography variant="subtitle2" gutterBottom className={classes.listsProfileOwner}>
                                    {data.currentUser.getListsShow.mode === "public"
                                        ?
                                    <span>
                                        A public list by 
                                        <Link to={`/userprofile/${data.currentUser.getListsShow.user.screen_name}`} className={classes.listsProfileLink}>
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
                                <Typography variant="subtitle2" className={classes.listsProfileOwner}>
                                    {data.currentUser.getListsShow.description}
                                </Typography>
                                <Grid item className={classes.listProfileUserCountGrid}>
                                <Grid item>
                                        <Typography variant="subtitle2">
                                            Members
                                        </Typography>
                                        <Typography variant="subtitle2" className={classes.listsProfileUserCountColor}>
                                            {data.currentUser.getListsShow.member_count}
                                        </Typography>
                                    </Grid>
                                    <Grid item>
                                        <Typography variant="subtitle2">
                                            Subscribers
                                        </Typography>
                                        <Typography variant="subtitle2" className={classes.listsProfileUserCountColor}>
                                            {data.currentUser.getListsShow.subscriber_count}
                                        </Typography>
                                    </Grid>
                                </Grid>
                            </CardContent>
                            <Grid className={classes.listsProfileAvatarGrid}>
                                <Avatar src={data.currentUser.getListsShow.user.profile_image_url_https} alt={`${data.currentUser.getListsShow.user.screen_name} avatar`}/>
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
