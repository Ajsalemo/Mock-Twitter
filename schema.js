// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const { GraphQLObjectType, GraphQLString } = require('graphql');

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const userObject = {
    sub: {
        type: GraphQLString,
        description: 'ID'
    },
    nickname: {
        type: GraphQLString,
        description: 'Nickname'
    },
    name: {
        type: GraphQLString,
        description: 'name'
    },
    picture: {
        type: GraphQLString,
        description: 'Profile picture'
    },
    updated_at: {
        type: GraphQLString,
        description: 'Last updated'
    }
};

const UserInfo = new GraphQLObjectType({
    name: 'UserInfo',
    description: 'Information of the user',
    fields: () => (
        userObject
    )
});

const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    description: 'Root Query',
    fields: () => ({
        type: UserInfo,
        async resolve(parent, args, context) {
            console.log(context)
        }
    })
});

// ----------------------------------------------------------------------------------------------------- //

