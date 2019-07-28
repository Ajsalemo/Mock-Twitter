// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles, Grid, CircularProgress, Typography } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import Error from '../../components/error';

// Apollo Query
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    notFoundContainer: {
        marginTop: '10em',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column'
    },
    notFoundMainFont: {
        fontWeight: 'bold',
        fontSize: '2em'
    },
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const NotFound = props => {
    const { classes } = props;
    return (
        <Query query={VERIFY_USER}>
            {({ loading, error, data }) => {
                if (loading) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                if (error) return <div className={classes.errorAndLoadingDiv}><Error /></div>;
                return (
                    <React.Fragment>
                        <Navbar 
                            profileLinkColor={data.currentUser.verifyCredentials.profile_link_color}
                            avatarImg={data.currentUser.verifyCredentials.profile_image_url_https}
                            name={data.currentUser.verifyCredentials.name}
                            screenName={data.currentUser.verifyCredentials.screen_name}                      
                        />
                        <Grid container className={classes.notFoundContainer}>
                            <Typography variant='h6' gutterBottom className={classes.notFoundMainFont}>
                                Sorry, that page doesn't exist!
                            </Typography>
                            <Typography variant='h6' gutterBottom className={classes.notFoundMainFont}>
                                Or an error occured
                            </Typography>
                            <Typography variant='subtitle2' gutterBottom>
                                <span>Why not try a <Link to={'/main'}>search</Link> to find something else?</span>
                            </Typography>
                        </Grid>
                    </React.Fragment>        
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(NotFound);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

