/* eslint-disable */
import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchGirl, saveGirl } from './actions';

import GirlDetails from './GirlDetails.js';

class Detail extends React.Component {
    
    
    state = {
        redirect:false
    }
    
    
    componentDidMount() {
        
     /*if (this.props.params._id) {
       match.fetchGame(this.props.params._id);
     }*/
    }
    
    /*
    saveGame = ({_id, title, cover }) =>  {
    if(_id) {
        return this.props.updateGame({ _id, title, cover }).then(
            () => { this.setState({ redirect: true })}
        );
        } else {
        return this.props.saveGame({ title, cover}).then(
            () => { this.setState({ redirect: true })}
                
            );
        };
    }*/
    
    render() {
        console.log(this.props.match.params)
        return (
            <div>
               { this.props.match.params._id === 'new' ? <GirlDetails girl={this.props.girl} saveGirl={this.props.saveGirl} /> : '' }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
    return { girl: null }
    
  /*if (this.props.match.params._id) {
    return {
      girl: state.girls.find(item => item._id === match.params._id)
    }
  }
  return { girl: null }*/
}

export default connect(mapStateToProps, { fetchGirl, saveGirl })(Detail);