import React, { Component } from 'react';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import CssBaseline from 'material-ui/CssBaseline';

import NavBar from './components/NavBar';
import Search from './components/Search';

const theme = createMuiTheme();

class App extends Component {
  render() {
    return (
      <MuiThemeProvider theme={theme}>
        <CssBaseline />
        <NavBar />
        <Search />
      </MuiThemeProvider>
    );
  }
}

export default App;
