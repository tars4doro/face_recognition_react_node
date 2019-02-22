import React from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

const styles = {
  card: {
    margin: '8px auto 8px'
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
    borderRadius: 5,
    cursor: 'pointer'
  },
  canvasItem: {
    margin: '2px 5px',
    border: '2px  solid #149df2',
    borderRadius: 5,
    cursor: 'pointer'
  },
  canvasList: {
    margin: '8px auto 0',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    alignItems: 'center'
  }
};

const ImgCard = ({ classes, imageBlobURL, detectFaces, latestImageDetectedFacesArray, clearlatestImageDetectedFacesArray}) => {
  
    return (
    <React.Fragment>
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
        <div>
          <CardMedia
            component='img'
            id='detection-image'
            alt='fetch result'
            className={classes.media}
            src={imageBlobURL}
            title='fetch result'
          />
        {!!latestImageDetectedFacesArray.length 
          && latestImageDetectedFacesArray.map(  
            ({ id, region_info: { bounding_box : { top_row, right_col, bottom_row, left_col  } } }) => {
      
              let topCord = top_row * 100 + '%';
              let rightCord = (1 - right_col) * 100 + '%';
              let bottomCord = (1 - bottom_row) * 100 + '%';
              let leftCord = left_col * 100 + '%';

              return (<div 
                        key={'div'+id} 
                        id={'div'+id}
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
          <Paper className={classes.canvasList}>
            {!!latestImageDetectedFacesArray.length && latestImageDetectedFacesArray.map( ({ id, region_info: { bounding_box : { top_row, right_col, bottom_row, left_col  } } }) => {
            
            let detectImage = document.getElementById('detection-image'), scrollHeight, scrollWidth, naturalHeight, naturalWidth;
            if (detectImage) ({ scrollHeight, scrollWidth, naturalHeight, naturalWidth } = detectImage);
            
            return <canvas 
                    key={'canvas'+id} 
                    id={'canvas'+id} 
                    className={classes.canvasItem}
                    width={(right_col - left_col) * scrollWidth} 
                    height={(bottom_row - top_row) * scrollHeight}
                    ref={(canv) => { if (canv) { canv.getContext('2d').drawImage(document.getElementById('detection-image'),
                      left_col * naturalWidth, top_row * naturalHeight, (right_col - left_col) * naturalWidth, (bottom_row - top_row) * naturalHeight,
                      0, 0, canv.width, canv.height);
                    } else (!!latestImageDetectedFacesArray.length && clearlatestImageDetectedFacesArray()) }}>
                   </canvas>;
            })}
          </Paper>
        </CardContent>
        )}
    </Card>
    </React.Fragment>
  );
}

export default withStyles(styles)(ImgCard);