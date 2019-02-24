import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import MainGrid from './Components/MainGrid/MainGrid';
import HomePage from './Components/HomePage/HomePage';
import ProfilePage from './Components/ProfilePage/ProfilePage';
import RegisterPage from './Components/RegisterPage/RegisterPage';
import LoginPage from './Components/LoginPage/LoginPage';
import ImageRecognitionPage from './Components/ImageRecognitionPage/ImageRecognitionPage';

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
      auth: true,
      isDrawerOpen: false,
      isAddImageDialogOpen: false,
      fetchedImageStatus: '',
      fetchedImageBlobObjURL: null,
      latestImageSuccessURL: '',
    };
  }

  //right side drawer menu handlers
  toggleDrawer = () => !this.state.isDrawerOpen ? this.setState({isDrawerOpen: true}) : this.setState({isDrawerOpen: false});
  drawerClick = () => this.toggleDrawer();

  //appbar login/logout handler
  handleAuthChange = event => this.setState({ auth: event.target.checked });

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
              <Route path='/register' component={RegisterPage} />
              <Route path='/login' component={LoginPage} />
              <Route 
                path='/image-recognition' 
                render={ () => (<ImageRecognitionPage 
                  fetchedImageStatus={this.state.fetchedImageStatus} 
                  fetchedImageBlobObjURL={this.state.fetchedImageBlobObjURL}
                  latestImageSuccessURL={this.state.latestImageSuccessURL}/>) }/>
              <Route path="*" component={HomePage} />
            </Switch>
        </MainGrid>
      </MuiThemeProvider>
    );
  }
}

export default App;
