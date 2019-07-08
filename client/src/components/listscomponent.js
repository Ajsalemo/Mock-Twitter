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
        paddingLeft: '0.7em',
        marginBottom: '1.5em'
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
        display: 'flex'
    },
    listsComponentLink: {
        textDecoration: 'none',
        color: 'inherit'
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
                
                console.log(data)
                return (
                    <Paper className={classes.listsComponentPaper}>
                        <Grid className={classes.listsComponentFontGrid}>
                            <Typography variant="h6">
                                Subscribed to
                            </Typography>
                        </Grid>
                        {
                            data.currentUser.getLists.map((lists, i) => {
                                return (
                                    <Grid className={classes.listsComponentDataGrid}>
                                        <Typography variant="subtitle2" gutterBottom className={classes.listComponentDataTypography}>
                                            {lists.name}
                                            <span className={classes.listsComponentSpan}>
                                                <Link to={`/userprofile/${lists.user.screen_name}`} className={classes.listsComponentLink}>
                                                    by {lists.user.screen_name}
                                                </Link>
                                            </span>
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
