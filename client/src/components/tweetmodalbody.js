// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { Close } from '@material-ui/icons';
import { withStyles, CircularProgress, Paper, Grid, Typography } from '@material-ui/core';

// Components
import TweetModalForm from '../components/tweetmodalform';
import Error from '../components/error';

// Apollo Queries
import { GET_USER } from '../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    tweetModalPaper: {
        width: '40em',
        backgroundColor: '#fff'
    },
    tweetModalHeader: {
        fontWeight: '800',
        padding: '0.5em',
        fontSize: '1.1em',
        textAlign: 'center',
        flexBasis: '95%'
    },
    tweetModalGrid: {
        backgroundColor: '#f0f8ff',
        display: 'flex',
        flexDirection: 'row'
    },
    tweetModalTypographyGrid: {
        display: 'flex',
        flexDirection: 'row'
    },
    closeIcon: {
        flexBasis: '5%',
        alignSelf: 'center',
        '&:hover': {
            cursor: 'pointer'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const TweetModalBody = props => {
    const { classes, onClose } = props;
    return (
        <Query query={GET_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <Error />;

                return (
                    <Paper className={classes.tweetModalPaper} tabIndex='-1'>
                        <Grid item className={classes.tweetModalTypographyGrid}>
                            <Typography variant="subtitle2" className={classes.tweetModalHeader}>
                                Compose new Tweet
                            </Typography>
                            <div onClick={onClose} className={classes.closeIcon}>
                                <Close />
                            </div>
                        </Grid>
                        <Grid item className={classes.tweetModalGrid}>
                            <TweetModalForm
                                avatar={data.currentUser.picture}
                                // Passed from the 'TweetModal' component
                                onClose={onClose}
                            />
                        </Grid>
                    </Paper>
                );
            }}
        </Query>
    );
};
        
// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(TweetModalBody);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
