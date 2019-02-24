import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardActions from '@material-ui/core/CardActions';
import CardMedia from '@material-ui/core/CardMedia';
import Button from '@material-ui/core/Button';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import CircularIndeterminate from '../LoadingAnimation/LoadingAnimation';
import Clarifai, { FACE_DETECT_MODEL } from  'clarifai';

const clarifaiApp = new Clarifai.App({ apiKey: '79dfd295ef964eb5a8f4badbaaaf900d' });

const styles = {
  card: {
    margin: '8px auto 8px'
  },
  cardActionsClass: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center'
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

class ImgCard extends Component { 
  
  constructor (props) {
    super(props);
    this.state = {
      detectionProgress: 'detecting',
      latestUsedImageURL: '',
      latestImageDetectedFacesArray:[]
    }
  }

  //clarifai API face detection handler
  detectFaces = () => { this.setState({detectionProgress: 'detecting'});
                        clarifaiApp.models.predict(FACE_DETECT_MODEL, this.props.latestImageSuccessURL)
                        .then( res => { if (res.outputs[0].data.regions.length) 
                                          {this.setState({ latestImageDetectedFacesArray:res.outputs[0].data.regions, 
                                                           detectionProgress: 'done', 
                                                           latestUsedImageURL: this.props.latestImageSuccessURL });} 
                                        else this.setState({detectionProgress: 'failed'}) })
                        .catch( () => this.setState({ detectionProgress: 'failed' }) );
  }

  componentDidMount () { this.detectFaces(); }

  shouldComponentUpdate () { return (this.state.detectionProgress === 'done') && ( this.state.latestUsedImageURL === this.props.latestImageSuccessURL) ? false : true };

  render() {

    const { classes, imageBlobURL } = this.props;
    let { latestImageDetectedFacesArray, detectionProgress } = this.state;

    return (
    <React.Fragment>
    <Card className={classes.card} raised={true}>
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
        {(detectionProgress === 'done') 
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
      {(detectionProgress === 'done') && (
        <CardContent>
          <Typography align='center' variant='h5' color='textPrimary'>
            {latestImageDetectedFacesArray.length} faces detected!
          </Typography>
          <Paper className={classes.canvasList}>
            {latestImageDetectedFacesArray.map( ({ id, region_info: { bounding_box : { top_row, right_col, bottom_row, left_col  } } }) => {
            
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
                      0, 0, canv.width, canv.height); } 
                      }}>
                   </canvas>;
            })}
          </Paper>
        </CardContent>
      )}
      {(detectionProgress === 'failed') && (
        <CardActions className={classes.cardActionsClass}>
          <Typography align='center' color='textPrimary' variant='h5'>
            There are no faces on the image or Detection error occured!
          </Typography>
          <Typography variant='subtitle1' color='textPrimary' align='center'>
            Please add an image containing faces of people or press Detect Again button.
          </Typography>
          <Button 
          className={classes.button} 
          size='medium' 
          variant='contained' 
          color='secondary'
          onClick={this.detectFaces}>
            Detect Again
          </Button>
        </CardActions>
      )}
      {(detectionProgress === 'detecting') && (
        <CardContent>
          <Typography align='center' color='textPrimary' variant='h5'>
          <CircularIndeterminate /> Processing image. Please wait...
          </Typography>
        </CardContent>
      )}
    </Card>
    </React.Fragment>
  );
}
}

export default withStyles(styles)(ImgCard);