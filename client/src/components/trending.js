// * --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// * Material-UI components
import { withStyles, Paper, Card, CardContent, Typography, CircularProgress } from '@material-ui/core';

// * Apollo Queries
import { GET_TRENDING_TOPICS } from '../apolloclient/apolloqueries';

// * Components 
import Error from '../components/error';

// * Helper functions
import { removeLeadingHashtag } from '../helpers/helperfunctions';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    trendingPaper: {
        marginTop: '1em'
    },
    trendingCard: {
        borderRadius: '0%'
    },
    cardContentUpper: {
        paddingBottom: '0em'
    },
    cardContentBottom: {
        paddingTop: '0em',
        paddingBottom: '0.5em'
    },
    trendingNamesColor: {
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    trendingTweetNumber: {
        lineHeight: '0.75'
    },
    trendingTweetsFont: {
        fontWeight: '100',
        fontSize: '0.8em'
    },
    trendingLinks: {
        color: 'inherit',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Trending = props => {
    const { classes, profileLinkColor, darkModeBorder, darkModeFont, darkModeComponentBackground } = props;
    return (
        <Query query={GET_TRENDING_TOPICS} fetchPolicy='cache-and-network'>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) return <div><Error /></div>;
                return (
                    <Paper className={classes.trendingPaper}>
                        <Card className={classes.trendingCard} style={{ backgroundColor: darkModeComponentBackground, border: darkModeBorder }}> 
                            <CardContent className={classes.cardContentUpper}>
                                {/* // ! Inline styles are used for dark mode */}
                                <Typography variant="h6" gutterBottom style={{ color: darkModeFont }}>
                                    Trends for you
                                </Typography>
                            </CardContent>
                            {/* // * 2D loop to retrieve values */}
                            {data.currentUser.trendingTopics.map((trendingArray, i) => {
                                return trendingArray.trends.map((trendingArrayInner, j) => {
                                    const removeHashtag = removeLeadingHashtag(trendingArrayInner.name);
                                    return (
                                        <CardContent className={classes.cardContentBottom} key={j}>
                                            <Typography variant="subtitle2">
                                                <span 
                                                    className={classes.trendingNamesColor}
                                                    // ! Inline styles are used for dark mode
                                                    style={{ color: darkModeFont ? darkModeFont : `#${profileLinkColor}` }}
                                                >
                                                    <Link to={`/search/${removeHashtag}`} className={classes.trendingLinks}>
                                                        {trendingArrayInner.name}
                                                    </Link>
                                                </span>
                                            </Typography>
                                            <Typography 
                                                variant="subtitle1" 
                                                gutterBottom 
                                                className={classes.trendingTweetNumber}
                                                // ! Inline styles are used for dark mode
                                                style={{ color: darkModeFont }}
                                            >
                                                {trendingArrayInner.tweet_volume
                                                    ?
                                                <span className={classes.trendingTweetsFont}>
                                                    {trendingArrayInner.tweet_volume} Tweets
                                                </span>
                                                    :
                                                null}
                                            </Typography>
                                        </CardContent>
                                    );
                                })
                            })}
                        </Card>
                    </Paper>
                );
            }}
        </Query>
    );
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Trending);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
