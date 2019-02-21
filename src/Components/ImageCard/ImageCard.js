import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';

const styles = {
  card: {
    margin: '8px auto 0'
  },
  button: {
    margin: '0 auto'
  },
  media: {
    // object-fit is not supported by IE 11.
    objectFit: 'cover',
    cursor: 'default'
  },
  faceBox: {
    position: 'absolute',
    border: '2px  solid #149df2',
    borderRadius: 3,
    cursor: 'pointer'
  }
};

const ImgCard = ({ classes, imageBlobURL, detectFaces, latestImageDetectedFacesArray}) => {
  
  return (
    <Card className={classes.card} raised={true}>
      <CardActions>
        <Button 
        className={classes.button} 
        size='medium' 
        variant='contained' 
        color='secondary'
        onClick={detectFaces}>
          Start Detection
        </Button>
      </CardActions>
      <CardActionArea>
        <div id='detection-image-wrapper'>
          <CardMedia
            component='img'
            alt='fetch result'
            className={classes.media}
            src={imageBlobURL}
            title='fetch result'
          />
          {!!latestImageDetectedFacesArray.length && 
          latestImageDetectedFacesArray.map( ({ id, region_info: { bounding_box : { top_row, right_col, bottom_row, left_col  } } }) => {
            
            let topCord = top_row * 100 + '%';
            let rightCord = (1 - right_col) * 100 + '%';
            let bottomCord = (1 - bottom_row) * 100 + '%';
            let leftCord = left_col * 100 + '%';

            return (<div 
                      key={id} 
                      className={classes.faceBox}
                      style={{top: topCord, right: rightCord, bottom: bottomCord, left: leftCord}}>
                    </div>)
          })}
        </div>
      </CardActionArea>
      {!!latestImageDetectedFacesArray.length && (
        <CardContent>
        <Typography align='center' variant='h5'>
          {latestImageDetectedFacesArray.length} faces detected!
        </Typography>
        </CardContent>
      )}
    </Card>
  );
}

export default withStyles(styles)(ImgCard);