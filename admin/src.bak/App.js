import React, { Component } from 'react';
//import logo from './logo.svg';
import { Link, Route } from 'react-router-dom';
import GamesPage from './GamesPage';
import GameForm from './GameForm';
import GameFormPage from './GameFormPage';
import './App.scss';

class App extends Component {
  render() {
    return (
      <div className="ui container">
        <div className="ui three item menu">
          <Link className="item" to="/">Home</Link>
          <Link className="item" to="/games">Games</Link>
          <Link className="item" to="/games/new">Add New Games</Link>
        </div>
        
        <p className="App-intro">
          <Link to="games">Games</Link>
        </p>
        <Route exact path="/games" component={GamesPage} />
        <Route path="/games/new" component={GameFormPage} />
        <Route path="/game/:_id" component={GameFormPage} />

      </div>
    );
  }
}

export default App;
