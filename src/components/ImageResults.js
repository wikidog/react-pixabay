import React, { Component } from 'react';

import { withStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';

const styles = theme => ({});

class ImageResults extends Component {
  state = {
    open: false,
    currentImg: null,
  };

  handleClickOpen = img => {
    this.setState({ open: true, currentImg: img });
  };

  handleClose = () => {
    this.setState({ open: false });
  };

  render() {
    const { images } = this.props;

    if (!images) {
      return null;
    }

    return (
      <div>
        <GridList cols={3}>
          {images.map(img => (
            <GridListTile key={img.id}>
              <img src={img.largeImageURL} alt={img.title} />
              <GridListTileBar
                title={img.tags}
                subtitle={<span>by: {img.user}</span>}
                actionIcon={
                  <IconButton
                    onClick={() => this.handleClickOpen(img.largeImageURL)}
                  >
                    <ZoomInIcon color="secondary" />
                  </IconButton>
                }
              />
            </GridListTile>
          ))}
        </GridList>
        <Dialog open={this.state.open} onClose={this.handleClose}>
          <DialogContent>
            <img src={this.state.currentImg} alt="" style={{ width: '100%' }} />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose} color="primary" autoFocus>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    );
  }
}

export default withStyles(styles)(ImageResults);
