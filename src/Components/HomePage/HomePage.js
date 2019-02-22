import React from 'react';
import { NavLink } from 'react-router-dom';
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

const HomePage = (props) => {
    const { classes } = props;
return (
    <React.Fragment>
        <Grid item xs={12}>
            <Paper className={classes.root} elevation={5}>
              <Typography variant="h5" component="h3">
                Welcome to the Face Regognition App
              </Typography>
              <Typography component="p">
                You have to <NavLink to='/login'>login</NavLink> or <NavLink to='register'>register</NavLink> to get personalized experience
              </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper className={classes.root} elevation={5}>
              <Typography variant="h5" component="h3">
                Latest Registered Users
              </Typography>
              <Typography component="p">
                Userlist
              </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper className={classes.root} elevation={5}>
              <Typography variant="h5" component="h3">
                Top 5 Users
              </Typography>
              <Typography component="p">
                Userlist
              </Typography>
            </Paper>
        </Grid>



        <Grid item xs={12}>
            <Paper className={classes.root} elevation={5}>
              <Typography variant="h5" component="h3">
                Welcome to the Face Regognition App
              </Typography>
              <Typography component="p">
                You have to <NavLink to='/login'>login</NavLink> or <NavLink to='register'>register</NavLink> to get personalized experience
              </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper className={classes.root} elevation={5}>
              <Typography variant="h5" component="h3">
                Latest Registered Users
              </Typography>
              <Typography component="p">
                Userlist
              </Typography>
            </Paper>
        </Grid>
        <Grid item xs={12} sm={6}>
        <Paper className={classes.root} elevation={5}>
              <Typography variant="h5" component="h3">
                Top 5 Users
              </Typography>
              <Typography component="p">
                Userlist
              </Typography>
            </Paper>
        </Grid>





    </React.Fragment>
)};

export default withStyles(styles)(HomePage);