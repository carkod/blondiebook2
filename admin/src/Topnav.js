import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import classnames from 'classnames';


class Topnav extends Component {
  
  state = {
    dropdownclicked : false,  
  };
  
  
  dropdownClick = (e) => {
    e.preventDefault();
    if (!this.state.dropdownclicked) {
      this.setState({
        dropdownclicked: true
      });
    } else {
      this.setState({
        dropdownclicked: false
      });
    }
  }
  
  render() {
    var dropdownClass = classnames({
      dropdown: true,
      'open': this.state.dropdownclicked,
      //'btn-over': !this.state.isPressed && this.state.isHovered
    });
    return (
      
      <ul className="nav navbar-nav">
        <li className={dropdownClass}>
          <a onClick={this.dropdownClick.bind(this)} className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Vkontakte <span className="caret"></span>
          </a>
          <ul className="dropdown-menu">
            <li><Link to="/vk">All girls</Link></li>
            <li><Link to="/vk/new">Add new girl</Link></li>
          </ul>
        </li>
        <li>
            <Link to="/fb">Facebook</Link>
        </li>
        <li>
            <Link to="/sources">API sources</Link>
        </li>
        
        {/*
        
        <li className="dropdown">
          <a href="#" className="dropdown-toggle" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">Vkontakte <span className="caret"></span></a>
          <ul className="dropdown-menu">
            <li><a href="#">Action</a></li>
            <li><a href="#">Another action</a></li>
            <li><a href="#">Something else here</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">Separated link</a></li>
            <li role="separator" className="divider"></li>
            <li><a href="#">One more separated link</a></li>
          </ul>
        </li>
        */}
      </ul>
      
    );
  }
}

export default Topnav;


