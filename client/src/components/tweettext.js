// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import Moment from 'react-moment';

// Material-UI components
import Typography from '@material-ui/core/Typography';
import { withStyles } from '@material-ui/core';

// Images
import verifiedIcon from '../images/verifiedicon.png';

// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    verifiedTimelineIcon: {
        height: '1em',
        width: '1em',
        marginLeft: '0.4em'
    },
    timelineHandleFont: {
        fontWeight: '100',
        marginLeft: '0.4em'
    },
    timelineDotSpacing: {
        margin: '0em 0.4em'
    },
    timelimeTweets: {
        fontWeight: '300'
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const Tweettext = props => {
    const { classes, name, verified, nickname, created_at, full_text } = props;
    return (
        <React.Fragment>
            {/* Name and handle */}
            <Typography variant="subtitle2">
                <span>{name}</span>
                {/* If the Twitter account is verified - display the blue 'check' icon */}
                {verified === true 
                    ? 
                <img src={verifiedIcon} className={classes.verifiedTimelineIcon} alt="verified account" />
                    : 
                null}
                <span className={classes.timelineHandleFont}>@{nickname}</span>
                <span className={classes.timelineDotSpacing}>&#8226;</span>
                <span className={classes.timelineHandleFont}><Moment fromNow>{created_at}</Moment></span>
            </Typography>
            {/* Tweet body */}
            <Typography variant="body2" gutterBottom>
                <span className={classes.timelimeTweets}>{full_text}</span>
            </Typography>
        </React.Fragment>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Tweettext);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
