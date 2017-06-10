import React, { Component } from 'react';

import Topnav from './Topnav';
import Searchbox from './Searchbox';

class Navbar extends Component {
  render() {
    return (
      <nav className="navbar navbar-default">
  <div className="container-fluid">
    {/* Brand and toggle get grouped for better mobile display */}
    <div className="navbar-header">
      <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
        <span className="sr-only">Toggle navigation</span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
        <span className="icon-bar"></span>
      </button>
      <a className="navbar-brand" href="/">BLONDIEBOOK</a>
    </div>

    {/* Collect the nav links, forms, and other content for toggling */}
    <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
      <Topnav />
      
      <ul className="nav navbar-nav navbar-right">
        <li>
          <Searchbox />
        </li>
      </ul>
    </div>{/* /.navbar-collapse */}
  </div>{/* /.container-fluid */}
</nav>
    );
  }
}

export default Navbar;


