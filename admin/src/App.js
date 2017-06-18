/* eslint-disable */
import React, { Component } from 'react';
//import logo from './logo.svg';
import { Link, Route } from 'react-router-dom';

import Navbar from './Navbar';
import Home from './Home';
import List from './List';
import Detail from './Detail';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="container">
        <Navbar />
        
        <Route exact path="/" component={Home} />
        <Route exact path="/vk" component={List} />
        <Route path="/vk/new" component={Detail} />
        <Route path="/bk/:_id" component={Detail} />
      </div>
    );
  }
}

export default App;