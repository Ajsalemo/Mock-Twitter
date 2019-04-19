// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import CircularProgress from '@material-ui/core/CircularProgress';

// Apollo Queries
import { GET_SUGGESTED_CATEGORIES_MEMBERS_GROUP } from '../apolloclient/apolloqueries';

// Components 
import SuggestedUsers from '../components/suggestedusers';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const SuggestedCategories = props => {
    const { categories } = props;
    return (
        <Query query={GET_SUGGESTED_CATEGORIES_MEMBERS_GROUP} variables={{ slug: categories }}>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return console.log(error);

                return (
                    data.currentUser.suggestedCategorySlug.users.map((userInfo, j) => {
                        return (
                            <SuggestedUsers
                                key={j}
                                id={userInfo.id}
                                name={userInfo.name}
                                screen_name={userInfo.screen_name}
                                src={userInfo.profile_image_url_https}
                                verified={userInfo.verified}
                                currentUser={data.currentUser.nickname}
                            />
                        );
                    })
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default SuggestedCategories;

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
