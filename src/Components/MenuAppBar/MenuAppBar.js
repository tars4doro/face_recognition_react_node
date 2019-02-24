import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Switch from '@material-ui/core/Switch';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import ThemeIcon from '@material-ui/icons/WbIncandescentOutlined';


const styles = theme => ({
  root: {
    flexGrow: 1,
    height: theme.spacing.unit * 8,
  },
  typography: {
    flexGrow: 1,
    whiteSpace: 'nowrap'
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 3
  },
  themeIcon: {
    marginLeft: 8
  },
  accountIcon: {
    marginRight: -12
  },
  labelFormControl: {
    color: 'inherit'
  }
});

class MenuAppBar extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      authIconAnchor: null
  }}

  //handle auth profile icon menu 
  handleAuthMenu = event => this.setState({ authIconAnchor: event.currentTarget });
  handleAuthClose = () => this.setState({ authIconAnchor: null });


  render() {

    const { classes, toggleDrawer, auth, 
            handleAuthChange, toggleTheme } = this.props;
    const { handleAuthMenu, handleAuthClose } = this;
    const { authIconAnchor } = this.state;

    const open = !!authIconAnchor;

  return (
    <AppBar className={classes.root}>
      <Toolbar>
        <IconButton onClick={toggleDrawer} className={classes.menuButton} color='inherit' aria-label='Menu'>
          <MenuIcon />
        </IconButton>
        <Typography 
          variant='h6' 
          color='inherit' 
          className={classes.typography}>
            Face Detection
        </Typography>
        {auth && (
          <div>
            <IconButton
              className={classes.accountIcon} 
              aria-owns={open ? 'menu-appbar' : undefined}
              aria-haspopup='true'
              onClick={handleAuthMenu}
              color='inherit'
            >
              <AccountCircle />
            </IconButton>
            <Menu
              disableAutoFocusItem={true}
              id='menu-appbar'
              anchorEl={authIconAnchor}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={open}
              onClose={handleAuthClose}
            >
              <MenuItem 
              component={NavLink} to='/profile' 
              onClick={handleAuthClose}>Profile</MenuItem>
              <MenuItem 
              component={NavLink} to='/' 
              onClick={handleAuthClose}>My account</MenuItem>
            </Menu>
          </div>
        )}
        <FormGroup>
          
            <FormControlLabel
            labelPlacement='start'
            classes={{ label: classes.labelFormControl }}
            label={auth ? 'Logout' : 'Login'}
            control={
              <NavLink to={auth ? '/' : '/login'}>
                <Switch 
                checked={auth}
                aria-label='LoginSwitch' />
              </NavLink>  
            }
            />
        </FormGroup>
        <IconButton onClick={toggleTheme} 
        className={classes.themeIcon} 
        color='inherit' 
        aria-label='Theme'>
          <ThemeIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
  }
}

export default withStyles(styles)(MenuAppBar);