// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';

// Apollo Queries
import { GET_TRENDING_TOPICS } from '../apolloclient/apolloqueries';

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
        color: '#00acee',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline'
        }
    },
    trendingTweetNumber: {
        lineHeight: '0.75'
    },
    trendingTweetsFont: {
        fontWeight: '100',
        fontSize: '0.8em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Trending = props => {
    const { classes } = props;
    return (
        <Query query={GET_TRENDING_TOPICS}>
            {({ loading, error, data }) => {
                if (loading) return <div><CircularProgress /></div>;
                if (error) console.log(error);

                return (
                    <Paper className={classes.trendingPaper}>
                        <Card className={classes.trendingCard}> 
                            <CardContent className={classes.cardContentUpper}>
                                <Typography variant="h6" gutterBottom>
                                    Trends for you
                                </Typography>
                            </CardContent>
                            {data.currentUser.trendingTopics.map((trendingArray, i) => {
                                return trendingArray.trends.map((trendingArrayInner, j) => {
                                    return (
                                        <React.Fragment>
                                            <CardContent className={classes.cardContentBottom} key={j}>
                                                <Typography variant="subtitle2">
                                                <a href={trendingArrayInner.url} className={classes.trendingNamesColor}>{trendingArrayInner.name}</a>
                                                </Typography>
                                                <Typography variant="subtitle1" gutterBottom className={classes.trendingTweetNumber}>
                                                    {trendingArrayInner.tweet_volume
                                                        ?
                                                    <span className={classes.trendingTweetsFont}>
                                                        {trendingArrayInner.tweet_volume} Tweets
                                                    </span>
                                                        :
                                                    null}
                                                </Typography>
                                            </CardContent>
                                        </React.Fragment>
                                    )
                                })
                            })}
                        </Card>
                    </Paper>
                )
            }}
        </Query>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Trending);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
