import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainGrid from './Components/MainGrid/MainGrid';
import HomePage from './Components/HomePage/HomePage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import ImageRecognitionPage from './Components/ImageRecognitionPage/ImageRecognitionPage';
import Clarifai, { FACE_DETECT_MODEL } from  'clarifai';

const clarifaiApp = new Clarifai.App({ apiKey: '79dfd295ef964eb5a8f4badbaaaf900d' });

const themeIsDark = createMuiTheme({
  palette: { type: 'dark' },
  typography: { useNextVariants: true }
});
const themeIsLight = createMuiTheme({
  palette: { type: 'light' },
  typography: { useNextVariants: true }
});

class App extends Component {
  constructor() {
    super();  
    this.state = {
      isThemeDark: true,
      auth: false,
      authIconAnchor: null,
      isDrawerOpen: false,
      isAddImageDialogOpen: false,
      fetchedImageStatus: '',
      fetchedImageBlobObjURL: null,
      latestImageSuccessURL: '',
      latestImageDetectedFacesArray:[]
    };
  }

  //right side drawer menu handlers
  toggleDrawer = () => !this.state.isDrawerOpen ? this.setState({isDrawerOpen: true}) : this.setState({isDrawerOpen: false});
  drawerClick = () => this.toggleDrawer();

  //appbar login and profile handlers
  handleAuthChange = event => this.setState({ auth: event.target.checked });
  handleAuthMenu = event => this.setState({ authIconAnchor: event.currentTarget });
  handleAuthClose = () => this.setState({ authIconAnchor: null });

  //theme switcher
  toggleTheme = () => this.state.isThemeDark ? this.setState({isThemeDark: false}) : this.setState({isThemeDark: true});
  
  //image URL input dialog handlers(using proxy to bypass CORS restrictions)
  fetchUserAddedImageURL = url => {
      this.setState({fetchedImageStatus: 'loading'});
      
      fetch('https://cors-anywhere.herokuapp.com/'+url)
        .then(res => { 
          if (res.ok) 
            return res.blob(); 
          else 
            throw new Error(); })
        .then(resultBlob => this.setState({
            fetchedImageBlobObjURL: URL.createObjectURL(resultBlob),
            fetchedImageStatus: 'done',
            latestImageSuccessURL: url
            }))
        .catch( () => this.setState({fetchedImageStatus: 'error'}));
      this.toggleAddImageDialog();    
  };
  toggleAddImageDialog = () => !this.state.isAddImageDialogOpen ? this.setState({isAddImageDialogOpen: true}) : this.setState({isAddImageDialogOpen: false});

  //clarifai API face detection handler
  detectFaces = () => clarifaiApp.models.predict(FACE_DETECT_MODEL, this.state.latestImageSuccessURL)
  .then( res => this.setState({ latestImageDetectedFacesArray:res.outputs[0].data.regions}))
  .catch( (err) => console.log(err) );
  clearlatestImageDetectedFacesArray = () => this.setState({latestImageDetectedFacesArray:[]});




  render() {
    return (
      <MuiThemeProvider theme={this.state.isThemeDark ? themeIsDark : themeIsLight}>
        <CssBaseline />
        <MainGrid
          toggleDrawer={this.toggleDrawer} 
          auth={this.state.auth} 
          authIconAnchor={this.state.authIconAnchor} 
          handleAuthChange={this.handleAuthChange} 
          handleAuthMenu={this.handleAuthMenu} 
          handleAuthClose={this.handleAuthClose} 
          toggleTheme={this.toggleTheme} 
          isDrawerOpen={this.state.isDrawerOpen} 
          drawerClick={this.drawerClick} 
          isAddImageDialogOpen={this.state.isAddImageDialogOpen} 
          toggleAddImageDialog={this.toggleAddImageDialog} 
          fetchUserAddedImageURL={this.fetchUserAddedImageURL}>
            <Switch>
              <Route path='/' exact component={HomePage} />
              <Route path='/profile' component={ProfilePage} />
              <Route path='/register' component={HomePage} />
              <Route path='/login' component={HomePage} />
              <Route 
                path='/image-recognition' 
                render={ () => (<ImageRecognitionPage 
                  fetchedImageStatus={this.state.fetchedImageStatus} 
                  fetchedImageBlobObjURL={this.state.fetchedImageBlobObjURL}
                  detectFaces={this.detectFaces}
                  latestImageDetectedFacesArray={this.state.latestImageDetectedFacesArray}
                  clearlatestImageDetectedFacesArray={this.clearlatestImageDetectedFacesArray}/>) }/>
              <Route path="*" component={HomePage} />
            </Switch>
        </MainGrid>
      </MuiThemeProvider>
    );
  }
}

export default App;
