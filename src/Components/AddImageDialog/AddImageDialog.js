import React, { Component } from 'react';
import { NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

class AddImageDialog extends Component {
    constructor () {
        super();
        this.state = {
            submitDisable: true
        }
    };

    //TODO regexp validation or validation with npm react-material-ui-form-validator 
    textfieldIsNotEmptyValidation = event => {
        if (event.target.value && this.state.submitDisable) this.setState({submitDisable: false});
        if (!event.target.value && !this.state.submitDisable) this.setState({submitDisable: true});
    };

    toggleAddImageDialog = () => {
        this.props.toggleAddImageDialog(); this.setState({submitDisable: true});
    }

    fetchUserAddedImageURL = () => {
        this.props.fetchUserAddedImageURL(document.getElementById('url-input').value); this.setState({submitDisable: true});
    }

    render () {
        return (
            <div>
              <Dialog
                open={this.props.isAddImageDialogOpen}
                onClose={this.toggleAddImageDialog}
                aria-labelledby='form-dialog-title'
              >
                <DialogTitle id='form-dialog-title'>Source Image</DialogTitle>
                <DialogContent>
                  <DialogContentText>
                    Enter URL of the image you want to use face recognition on
                  </DialogContentText>
                  <TextField
                    autoFocus
                    margin='dense'
                    id='url-input'
                    label='Image URL'
                    type='url'
                    fullWidth
                    onChange={this.textfieldIsNotEmptyValidation}
                  />
                </DialogContent>
                <DialogActions>
                  <Button 
                    onClick={this.toggleAddImageDialog}
                    variant='contained' 
                    color='primary'>
                      Cancel
                  </Button>
                  <Button 
                    disabled={this.state.submitDisable}
                    onClick={this.fetchUserAddedImageURL}
                    variant='contained' 
                    color='primary'
                    component={NavLink} 
                    to='/image-recognition'>
                      Submit
                  </Button>
                </DialogActions>
              </Dialog>
            </div>
    )};
};

export default AddImageDialog;