import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = theme => ({
    root: {
      padding: theme.spacing.unit,
      flexGrow: 1,
      marginRight: 5,
      marginBottom: 5,
      opacity: 0.85,
      textAlign: 'center'
    }
  });

const ProfilePage = ({classes}) => (
  <Grid item xs={12}>
    <Paper className={classes.root} elevation={5}>
      <Typography variant="h4" component="h3">
        Welcome to your profile
      </Typography>
      <Typography component="p">
        On this page you can check your detection history and edit it
      </Typography>
    </Paper>
  </Grid>);

export default withStyles(styles)(ProfilePage);