import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTitle } from 'material-ui';
import { Button, IconButton } from 'material-ui';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from 'material-ui/Dialog';

const styles = theme => ({});

class ImageResults extends Component {
  state = { open: false };

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    return <div />;
  }
}

export default withStyles(styles)(ImageResults);
