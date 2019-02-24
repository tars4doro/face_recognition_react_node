import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import { NavLink } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';
import TextField from '@material-ui/core/TextField';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const styles = theme => ({
  root : {
    margin: `${theme.spacing.unit * 2}px auto 0`,
  },
  paperMain: {
    opacity: 0.85,
    padding: theme.spacing.unit * 2,
    display: 'flex',
    flexDirection: 'column'
  },
  textField: {
    marginTop: theme.spacing.unit *2
  },
  buttons: {
      marginTop: theme.spacing.unit *2,
      display: 'flex',
      justifyContent: 'space-between'
  }
});


class FilledInputAdornments extends React.Component {
  state = {
    email:  '',  
    password: '',
    showPassword: false
  };


  //TODO validation with npm react-material-ui-form-validator 
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value });
  };
  handleClickShowPassword = () => {
    this.setState(state => ({ showPassword: !state.showPassword }));
  };

  render() {
    const { classes } = this.props;

    return (
      <Grid item xs={9} sm={6} md={4} className={classes.root}>
        <Paper className={classes.paperMain}>
            <Typography align='center' color='textPrimary' variant='h4'>
              Log In 
            </Typography>
            <Typography variant='subtitle1' color='textPrimary' align='center'>
              Please enter your email and password to log in
            </Typography>
            <TextField
              id='outlined-email'
              className={ classes.textField }
              variant='outlined'
              type='email'
              label='Enter your Email'
            />
            <TextField
              id='outlined-adornment-password'
              className={ classes.textField }
              variant='outlined'
              type={this.state.showPassword ? 'text' : 'password'}
              label='Enter Password'
              value={this.state.password}
              onChange={this.handleChange('password')}
              InputProps={{
                endAdornment: (
                  <InputAdornment position='end'>
                    <IconButton
                      aria-label='Toggle password visibility'
                      onClick={this.handleClickShowPassword}
                    >
                      {this.state.showPassword ? <Visibility /> : <VisibilityOff />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          <div className={classes.buttons}> 
            <Button 
              size='medium' 
              variant='contained' 
              color='secondary'
              component={NavLink} 
              to='/register'>
                Register
            </Button>
            <Button 
              size='medium' 
              variant='contained'
              color='primary'
              >
                Log In
            </Button>
          </div> 
        </Paper>
      </Grid>
    );
  }
}

export default withStyles(styles)(FilledInputAdornments);