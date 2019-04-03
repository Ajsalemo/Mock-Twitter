// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import { Query } from 'react-apollo';
import { Link } from 'react-router-dom';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

// Apollo Queries
import { GET_SUGGESTED_CATEGORIES, GET_SUGGESTED_CATEGORIES_MEMBERS_GROUP } from '../apolloclient/apolloqueries';

// Components
import SuggestedUsers from '../components/suggestedusers';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = () => ({
    spanLink: {
        fontSize: '0.6em',
        fontWeight: '100',
        textDecoration: 'none'
    },
    links: {
        textDecoration: 'none'
    },
    cardPadding: {
        padding: '15px'
    },
    recommendedCard: {
        borderRadius: '0%'
    },
    categoriesName: {
        color: '#00acee',
        textDecoration: 'none',
        '&:hover': {
            textDecoration: 'underline',
            cursor: 'pointer'
        }
    },
    expansionpanel: {
        boxShadow: 'none',
        '&:before': {
            backgroundColor: '#fff'
        }
    },
    expansionPanelDetails: {
        display: 'flex',
        flexDirection: 'column',
        padding: '0em',
        whiteSpace: 'nowrap',
        overflow: 'hidden'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Recommended = props => {
    const { classes } = props;
    return (
        <React.Fragment>
            <Grid item xs={8} sm={8} md={2}>
                <Paper>
                    <Card className={classes.recommendedCard}>
                        <CardContent classes={{ root: classes.cardPadding }}>
                            <Typography variant="h6" gutterBottom>
                                <span className={classes.spacing}>Who to follow</span>
                                &#8226;
                                <span className={classes.spanLink}>
                                    <Link to='#/' className={classes.links}>Refresh</Link>
                                </span>
                                &#8226;
                                <span className={classes.spanLink}>
                                    <Link to='#/' className={classes.links}>View all</Link>
                                </span>
                            </Typography>
                            <Query query={GET_SUGGESTED_CATEGORIES}>
                                {({ loading, error, data }) => {
                                    if (loading) return <div><CircularProgress /></div>;
                                    if (error) console.log(error);

                                    return data.currentUser.suggestedCategory.map((categories, i) => {
                                        return (
                                            <ExpansionPanel key={i} classes={{ root: classes.expansionpanel }}>
                                                <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                                                    <Typography variant="subtitle2" className={classes.categoriesName}>
                                                        {categories.name}
                                                    </Typography>
                                                </ExpansionPanelSummary>
                                                <ExpansionPanelDetails className={classes.expansionPanelDetails}>
                                                    {/* Nested Query to display twitter users of the categories being looped over */}
                                                    <Query query={GET_SUGGESTED_CATEGORIES_MEMBERS_GROUP} variables={{ slug: categories.slug }}>
                                                        {({ loading, error, data }) => {
                                                            if (loading) return <div><CircularProgress /></div>;
                                                            if (error) console.log(error);
                                                            console.log(data)
                                                            return data.currentUser.suggestedCategorySlug.users.map((userInfo, j) => {
                                                                return (
                                                                    <SuggestedUsers
                                                                        key={j}
                                                                        id={userInfo.id}
                                                                        name={userInfo.name}
                                                                        screen_name={userInfo.screen_name}
                                                                        src={userInfo.profile_image_url_https}
                                                                        verified={userInfo.verified}
                                                                    />
                                                                )
                                                            })
                                                        }}
                                                    </Query>
                                                </ExpansionPanelDetails>
                                            </ExpansionPanel>
                                        )
                                    })
                                }}
                            </Query>
                        </CardContent>
                    </Card>
                </Paper>
            </Grid>
        </React.Fragment>
    )
};


// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Recommended);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
