import React from 'react';
import ReactLoading from 'react-loading';
import { withStyles } from '@material-ui/core/styles';

let loadingColor = null;
const styles = theme => (loadingColor = theme.palette.text.primary);
  
const LoadingAnimation = () => (
    <ReactLoading type='bars' color={loadingColor} height={100} width={100} />
);

export default withStyles(styles)(LoadingAnimation);