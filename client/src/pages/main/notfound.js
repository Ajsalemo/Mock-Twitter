// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Link } from 'react-router-dom';
import { Query } from 'react-apollo';
import { connect } from 'react-redux'; 

// * Material-UI components
import { withStyles, Grid, CircularProgress, Typography } from '@material-ui/core';

// * Components
import Navbar from '../../components/navbar';
import Error from '../../components/error';

// * Apollo Query
import { VERIFY_USER } from '../../apolloclient/apolloqueries';

// * Helper function
import { fontColorChange, changeComponentBackground, changeBorder } from '../../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    notFoundContainer: {
        paddingTop: '10em',
        display: 'flex',
        textAlign: 'center',
        flexDirection: 'column',
        height: '100vh'
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

let NotFound = props => {
    const { classes, dark_mode } = props;
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
                            darkModeBorder={changeBorder(dark_mode)}
                            darkModeFont={fontColorChange(dark_mode)}
                            darkModeComponentBackground={changeComponentBackground(dark_mode)}                   
                        />
                        <Grid container className={classes.notFoundContainer} style={{ backgroundColor: changeComponentBackground(dark_mode) }}>
                            {/* // ! Inline styles are used for dark mode */}
                            <Typography variant='h6' gutterBottom className={classes.notFoundMainFont} style={{ color: fontColorChange(dark_mode) }}>
                                Sorry, that page doesn't exist!
                            </Typography>
                            {/* // ! Inline styles are used for dark mode */}
                            <Typography variant='h6' gutterBottom className={classes.notFoundMainFont} style={{ color: fontColorChange(dark_mode) }}>
                                Or an error occured
                            </Typography>
                            {/* // ! Inline styles are used for dark mode */}
                            <Typography variant='subtitle2' gutterBottom style={{ color: fontColorChange(dark_mode) }}>
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

const mapStateToProps = state => {
    return {
        dark_mode: state.toggleDarkMode.dark_mode
    };
};

// ----------------------------------------------------------------------------------------------------- //

NotFound = connect(
    mapStateToProps
)(NotFound);

// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(NotFound);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

