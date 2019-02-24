import React from 'react';
import { NavLink } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import ImageSearchIcon from '@material-ui/icons/ImageSearch';
import RegisterIcon from '@material-ui/icons/HowToReg';
import LoginIcon from '@material-ui/icons/AccountBox';


const styles = {
  list: {
    width: 250,
  }  
};
const listItems = [['Home', HomeIcon, '/'], ['Image Recognition', ImageSearchIcon, '/image-recognition'], 
                   ['Login', LoginIcon, '/login'], ['Register', RegisterIcon, '/register']];

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