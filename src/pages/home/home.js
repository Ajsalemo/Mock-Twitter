// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';
import classNames from 'classnames';

// Components
import Login from '../../components/login';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Search from '@material-ui/icons/Search';
import PeopleOutline from '@material-ui/icons/PeopleOutline';
import ChatBubbleOutline from '@material-ui/icons/ChatBubbleOutline';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

// Image
import twitterlogo from '../../images/twitterlogo.jpg';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    gridOne: {
        backgroundColor: '#00acee',
        background: `url(${twitterlogo}) no-repeat`,
        backgroundPositionX: '9em',
        backgroundPositionY: 'center',
        backgroundSize: '150%',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center'
    },
    gridTwo: {
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '75%'
    },
    leftColumnFont: {
        color: '#fff',
        letterSpacing: '0.1px',
        fontWeight: '500'
    },
    rightColumnFont: {
        color: '#000',
        letterSpacing: '0.1px',
        fontWeight: '600'
    },
    rightColumnFontMargin: {
        marginBottom: '2em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const Home = props => {
    const { classes } = props;
    return (
        <Grid container direction='column' style={{height: '100vh'}}>
            <Grid item xs={12} className={classes.gridOne}>
                <Grid item>
                    <Typography variant="h6" gutterBottom className={classes.leftColumnFont}>
                            <Search style={{marginRight: '0.2em'}} />Follow your interests
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.leftColumnFont}>
                            <PeopleOutline style={{marginRight: '0.2em'}} />Hear what people are talking about
                    </Typography>
                    <Typography variant="h6" gutterBottom className={classes.leftColumnFont}>
                            <ChatBubbleOutline style={{marginRight: '0.2em'}} />Join the conversation
                    </Typography>
                </Grid>
            </Grid>
            <Grid item xs={12}>
                <Login />
                <Grid item className={classes.gridTwo}>
                    <Grid item md={4}>
                        <Typography variant="h5" gutterBottom className={classNames(classes.rightColumnFont, classes.rightColumnFontMargin)}>
                            See whats happening in the world right now
                        </Typography>
                        <Typography variant="h6" gutterBottom className={classes.rightColumnFont}>
                            Join Twitter today.
                        </Typography>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(Home);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //
