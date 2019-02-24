import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import CircularIndeterminate from '../LoadingAnimation/LoadingAnimation';
import ImageCard from '../ImageCard/ImageCard';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';

const styles = {
    root: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      opacity: 0.85
    }
};

const ImageRecognitionPage = ({ classes, fetchedImageStatus, 
                                fetchedImageBlobObjURL, latestImageSuccessURL }) => {
    
    switch (fetchedImageStatus) {
      case 'loading': return (
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.root}>
            <Typography variant='h4' color='textPrimary' align='center'>Fetching Image</Typography>
            <CircularIndeterminate />
          </Paper>
        </Grid>
      );
      case 'error': return (
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.root}>
            <Typography variant='h4' color='textPrimary' align='center'>Fetching Error or image URL incorrect</Typography>
            <Typography variant='subtitle1' color='textPrimary' align='center'>Please check URL spelling or add another one</Typography>
          </Paper>
        </Grid>
      );
      case 'done': return (
        <React.Fragment>
          <Grid item xs={12}>
            <Paper elevation={3} className={classes.root}>
              <Typography variant='h4' color='textPrimary' align='center'>Image Fetched! </Typography>
              <Typography variant='subtitle1' color='textPrimary' align='center'>The recognition will start automatically</Typography>
            </Paper>
          </Grid>
          <ImageCard 
            imageBlobURL={fetchedImageBlobObjURL}
            latestImageSuccessURL={latestImageSuccessURL}
          />
        </React.Fragment> 
      );
      default:
      return (
        <Grid item xs={12}>
          <Paper elevation={3} className={classes.root}>
            <Typography variant='h4' color='textPrimary' align='center'>Add image</Typography>
            <Typography variant='subtitle1' color='textPrimary' align='center'>Use add button to enter URL of the image</Typography>
          </Paper>
        </Grid>
      );
    }
}

export default withStyles(styles)(ImageRecognitionPage);
