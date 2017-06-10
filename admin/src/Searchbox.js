/* eslint-disable */
import React, { Component } from 'react';
import { Link } from 'react-router-dom';


class Searchbox extends Component {
  render() {
    return (
      
      <form className="navbar-form navbar-left">
        <div className="form-group">
          <input type="text" className="form-control" placeholder="Search" />
        </div>
        <button type="submit" className="btn btn-default">Submit</button>
      </form>
      
    );
  }
}

export default Searchbox;
