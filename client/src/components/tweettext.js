// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';

// Material-UI components
import { Typography, Grid } from '@material-ui/core';
import { withStyles } from '@material-ui/core';

// Components
import EditPost from '../components/editposts';

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
    },
    profileLink: {
        textDecoration: 'none',
        color: '#000',
        '&:hover': {
            color: '#00acee'
        }
    },
    nameAndHandleGrid: {
        display: 'flex',
        justifyContent: 'space-between'
    }
});

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const Tweettext = props => {
    const { classes, name, verified, nickname, created_at, full_text, id } = props;
    return (
        <React.Fragment>
            {/* Name and handle */}
            <Grid item className={classes.nameAndHandleGrid}>
                <Typography variant="subtitle2">
                    <Link to={`/userprofile/${nickname}`} className={classes.profileLink}>{name}</Link>
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
                <Grid item>
                    <EditPost
                        // This is the tweet Id passed in from 'timeline.js' 
                        id={id}
                    />
                </Grid>
            </Grid>
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
