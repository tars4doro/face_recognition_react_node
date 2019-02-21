import React from 'react';
import Particles from 'react-particles-js';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import MenuAppBar from '../MenuAppBar/MenuAppBar';
import FooterBar from '../FooterBar/FooterBar';
import MyDrawer from '../MyDrawer/MyDrawer';
import AddImageDialog from '../AddImageDialog/AddImageDialog';

let particlesColor = null;

const styles = theme => {
  particlesColor = (theme.palette.type === 'dark') ? '#fff' : '#000';
  return ({
      root: {
        marginTop: theme.spacing.unit * 8 + 3,
        marginBottom: theme.spacing.unit * 6 + 3,
      },
      particlesClass: {
        position: 'fixed',
        top:  0,
        right: 0,
        bottom: 0,
        left: 0,
        zIndex: -55
      }
  })
};

const MainGrid = (props) => {
return (
  <React.Fragment>
    <MenuAppBar 
      toggleDrawer={props.toggleDrawer} 
      auth={props.auth} 
      authIconAnchor={props.authIconAnchor} 
      handleAuthChange={props.handleAuthChange} 
      handleAuthMenu={props.handleAuthMenu} 
      handleAuthClose={props.handleAuthClose} 
      toggleTheme={props.toggleTheme} />
    <Grid 
      container 
      className={props.classes.root}>
      { props.children }
    </Grid>
    <FooterBar toggleAddImageDialog={props.toggleAddImageDialog}/>
    <MyDrawer 
      isDrawerOpen={props.isDrawerOpen} 
      toggleDrawer={props.toggleDrawer} 
      drawerClick={props.drawerClick} />
    <AddImageDialog 
      isAddImageDialogOpen={props.isAddImageDialogOpen} 
      toggleAddImageDialog={props.toggleAddImageDialog} 
      fetchUserAddedImageURL={props.fetchUserAddedImageURL} />
    <Particles 
        params={{
          particles: {
            number: {
              value: 100,
              density: {
                enable: true,
                value_area: 700
              }
            },
            color: {
              value: particlesColor
            },
            size: {
              value: 8,
              random: true,
            },
            line_linked: {
              enable: false,
            }
          },
          interactivity: {
            detect_on: 'canvas',
            events: {
              onhover: {
                enable: true,
                mode: 'bubble'
              }
            },
            modes: {
              bubble: {
                distance: 250,
                size: 0,
                duration: 2,
                opacity: 0
              }
            }
          }
        }}
        className={props.classes.particlesClass}/>
  </React.Fragment>
)};

export default withStyles(styles)(MainGrid);