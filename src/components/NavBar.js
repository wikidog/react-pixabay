import React from 'react';
import { AppBar, Toolbar } from 'material-ui';
import Typography from 'material-ui/Typography';

const NavBar = () => (
  <AppBar position="static" color="default">
    <Toolbar>
      <Typography variant="title" color="inherit">
        PixaBay Image Finder
      </Typography>
    </Toolbar>
  </AppBar>
);

export default NavBar;
