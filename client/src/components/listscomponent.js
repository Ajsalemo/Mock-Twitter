// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// Material-UI components
import { withStyles, Grid, Paper, Typography, CircularProgress } from '@material-ui/core';

// Components
import Error from '../components/error';

// Apollo Query
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
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ListsComponent = props => {
    const { classes, URLparam } = props;
    return (
        <Query 
            query={GET_USER_LISTS}
            variables={{
                screen_name: URLparam
            }}
        >
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <div><Error /></div>;    
                return (
                    <Paper className={classes.listsComponentPaper}>
                        <Grid className={classes.listsComponentFontGrid}>
                            <Typography variant="h6">
                                <span  style={{ color: `#${data.currentUser.getLists[0].user.profile_link_color}` }}>Subscribed to</span>
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
                                                style={{ color: `#${data.currentUser.getLists[0].user.profile_link_color}` }}
                                            >
                                                {lists.name}
                                            </Link>
                                            <span className={classes.listsComponentSpan}>
                                                by 
                                                <Link to={`/userprofile/${lists.user.screen_name}`} className={classes.listsComponentLink}>
                                                    {lists.user.screen_name}
                                                </Link>
                                            </span>
                                        </Typography>
                                        <Typography variant="subtitle2" gutterBottom className={classes.listsComponentSpanMembers}>
                                            <span>{lists.member_count}</span> members
                                        </Typography>
                                    </Grid>
                                );
                            })
                        }
                    </Paper>
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
