// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { CircularProgress, withStyles } from '@material-ui/core';

// Components
import Navbar from '../../components/navbar';
import Error from '../../components/error';
import SearchAppBar from '../../components/searchappbar';

// Apollo Query
import { VERIFY_USER, SEARCH_TWEETS } from '../../apolloclient/apolloqueries';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    errorAndLoadingDiv: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const SearchPage = props => {
    const { classes } = props;
    const param = props.match.params.params; 
    console.log(param)
    return (
        <Query query={VERIFY_USER}>
            {({ loading: loadingOne, error: errorOne, data: one }) => (
                <Query 
                    query={SEARCH_TWEETS}
                    variables={{
                        query: param
                    }}
                >
                    {({ loading: loadingTwo, error: errorTwo, data: two }) => {
                        if(loadingOne || loadingTwo) return <div className={classes.errorAndLoadingDiv}><CircularProgress /></div>;
                        if(errorOne || errorTwo) return <div className={classes.errorAndLoadingDiv}><Error /></div>;
                        return (
                            <React.Fragment>
                                <Navbar 
                                    profileLinkColor={one.currentUser.verifyCredentials.profile_link_color}
                                    avatarImg={one.currentUser.verifyCredentials.profile_image_url_https}
                                    name={one.currentUser.verifyCredentials.name}
                                    screenName={one.currentUser.verifyCredentials.screen_name}
                                />
                                <SearchAppBar
                                    searchQuery={param}
                                    profileLinkColor={one.currentUser.verifyCredentials.profile_link_color}
                                />
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

export default withStyles(styles)(SearchPage);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
