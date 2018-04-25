import React, { Component } from 'react';

import withRoot from './withRoot';

import NavBar from './NavBar';
import Search from './Search';

class App extends Component {
  render() {
    return (
      <div>
        <NavBar />
        <Search />
      </div>
    );
  }
}

export default withRoot(App);
