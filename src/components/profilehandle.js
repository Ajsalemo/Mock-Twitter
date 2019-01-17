// --------------------------------------------- Imports ----------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

import React from 'react';

// Material-UI components
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardContent from '@material-ui/core/CardContent';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';

// Image
import avatar from '../images/avatar.png';

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

const styles = theme => ({
    twitterAvatar: {
        width: 70,
        height: 70,
        border: '4px solid #fff',
        '&:hover': {
            cursor: 'pointer'
        },
        position: 'absolute',
        bottom: '24.5em',
        left: '1em'
    },
    upperCardContent: {
        backgroundColor: '#007fec',
        height: '8em',
        position: 'relative'
    },
    lowerCardContent: {
        height: '9em'
    },
    upperText: {
        textAlign: 'center'
    },
    handleTextUpperDiv: {
        paddingLeft: '4em',
    },
    handleTextUpper: {
        wordBreak: 'break-word'
    },
    handleTextLower: {
        wordBreak: 'break-word',
        fontWeight: '200',
        display: 'inline-flex',
        fontSize: '0.9em'
    }
});

// ----------------------------------------------------------------------------------------------------- //

const ProfileHandle = props => {
    const { classes } = props;
    return (
        <Grid item style={{width: '20%'}}>
            <Paper>
                <Card>
                    <CardContent className={classes.upperCardContent}>

                    </CardContent>          
                    <Avatar alt="twitter avatar" src={avatar} className={classes.twitterAvatar} /> 
                    <CardContent className={classes.lowerCardContent}>
                        <Typography variant="h6" gutterBottom className={classes.upperText}>
                            <div className={classes.handleTextUpperDiv}>
                                <span className={classes.handleTextUpper}>Letterman Icon</span>
                                <span className={classes.handleTextLower}>@LettermanIcon</span>
                            </div>
                        </Typography>
                    </CardContent>
                </Card>
            </Paper>
        </Grid>

    )
};

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //

export default withStyles(styles)(ProfileHandle);

// ----------------------------------------------------------------------------------------------------- //
// ----------------------------------------------------------------------------------------------------- //