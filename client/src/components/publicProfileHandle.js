// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// * Material-UI components
import { withStyles, Card, CardContent, Typography } from '@material-ui/core';
import { CalendarToday } from '@material-ui/icons';

// * Components
import TweetModal from './tweetmodal';

// * Images
import verifiedIcon from '../images/verifiedicon.png';

// * Helper function
import { parseCreatedAtDate } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    publicProfileUpperText: {
        textAlign: 'left'
    },
    publicProfileTextUpper: {
        wordBreak: 'break-word',
        display: 'inline-flex ',
    },
    publicProfileTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        fontSize: '0.7em',
        display: 'block',
        color: '#6a6a6a'
    },
    publicProfileCard: {
        boxShadow: 'none',
        backgroundColor: 'inherit',
        marginTop: '1em'
    },
    verifiedPublicHandleIcon: {
        height: '1em',
        width: '1em',
        marginLeft: '0.4em'
    },
    publicProfileCreatedAt: {
        fontWeight: '200',
        fontSize: '0.7em',
        color: '#6a6a6a'
    },
    createdAtIcon: {
        fontSize: '0.9em',
        color: '#6a6a6a',
        marginRight: '0.3em'
    },
    descriptionContent: {
        fontSize: '0.7em',
        fontWeight: '200',
        display: 'block',
        wordBreak: 'break-word',
        padding: '0.5em 0'
    },
    publicProfileCardContent: {
        padding: '2em 0.5em 0em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const PublicProfileHandle = props => {
    const { classes, screenName, currentUser, URLparam, verified, description, createdAt, name, profileLinkColor, avatarImg} = props;
    return (
        <Card className={classes.publicProfileCard}>
            <CardContent className={classes.publicProfileCardContent}>
                <Typography variant="h6" gutterBottom className={classes.publicProfileUpperText}>
                    <span className={classes.publicProfileTextUpper}>{name}</span>
                    {/* // * If the account is verified display the 'blue check' icon */}
                    {verified === true 
                        ? 
                    <img src={verifiedIcon} className={classes.verifiedPublicHandleIcon} alt="verified account" />
                        : 
                    null}
                    <span className={classes.publicProfileTextLower}>@{screenName}</span>
                    <span className={classes.descriptionContent}>{description}</span>
                    <CalendarToday className={classes.createdAtIcon} />
                    <span className={classes.publicProfileCreatedAt}>
                        Joined {parseCreatedAtDate(createdAt)}
                    </span>
                    {/* // * If you're viewing your own profile, this component will be hidden */}
                    {/* // * Else if you're viewing someone elses profile, the 'tweet at' component will be displayed */}
                    {currentUser === URLparam
                        ?
                        null
                        :
                    <TweetModal 
                        userToReply={name}
                        userScreenName={screenName}
                        profileLinkColor={profileLinkColor}
                        avatarImg={avatarImg}
                    />}
                </Typography>
            </CardContent>
        </Card>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(PublicProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
