import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';

const styles = {
  appBar: {
    top: 'auto',
    bottom: 0,
  },
  toolbar: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  fabButton: {
    position: 'absolute',
    zIndex: 1,
    top: -10,
    right: 20,
    margin: '0 auto',
  },
};

const FooterBar = (props) => {
  const { classes, toggleAddImageDialog } = props;
  return (
      <AppBar color="primary" className={classes.appBar}>
        <Toolbar className={classes.toolbar} variant='dense'>
          <Fab 
            disabled={false} 
            size='medium' 
            color="secondary" 
            aria-label="Add" 
            className={classes.fabButton} 
            onClick={toggleAddImageDialog}>
              <AddIcon />
          </Fab>
        </Toolbar>
      </AppBar>
  );
}

export default withStyles(styles)(FooterBar);