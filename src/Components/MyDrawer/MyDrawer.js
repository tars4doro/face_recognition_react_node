import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import ThemeIcon from '@material-ui/icons/WbIncandescentOutlined';

const styles = {
  list: {
    width: 250,
  }  
};
const listItems = [['Home Page', ThemeIcon, '/'], ['Image Recognition', ThemeIcon, '/image-recognition'], ['3d', ThemeIcon, '/'], ['4th', ThemeIcon, '/']];

const MyDrawer = (props) => {
  
  const { classes, isDrawerOpen, toggleDrawer, drawerClick } = props;
  const sideList = (
    <div className={classes.list}>
      <List>
        {listItems.map((item) => {
        let MyListIcon = item[1];
        return (
          <React.Fragment key={item[0]}>
            <ListItem button component={NavLink} to={item[2]} divider={true}>
              <ListItemIcon><MyListIcon /></ListItemIcon>
              <ListItemText primary={item[0]} />
            </ListItem>
        </React.Fragment>)}
        )}
      </List>
    </div>
  );
  return (
    <div>
      <Drawer open={isDrawerOpen} onClose={toggleDrawer}>
        <div
          tabIndex={0}
          role='button'
          onClick={drawerClick}
        >
          {sideList}
        </div>
      </Drawer>
    </div>
  );
}

export default withStyles(styles)(MyDrawer);