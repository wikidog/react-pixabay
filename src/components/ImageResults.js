import React, { Component } from 'react';
import { withStyles } from 'material-ui/styles';
import GridList, { GridListTile, GridListTileBar } from 'material-ui/GridList';
import { Button, IconButton } from 'material-ui';
import ZoomInIcon from '@material-ui/icons/ZoomIn';
import Dialog, { DialogActions, DialogContent } from 'material-ui/Dialog';

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
