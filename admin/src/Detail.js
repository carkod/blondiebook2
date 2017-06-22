/* eslint-disable */
import React from 'react';

import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';
import { fetchGirl, saveGirl, updateGirl } from './actions';

import GirlDetails from './GirlDetails.js';

class Detail extends React.Component {

    state = {
        done:false,
    }
    
    componentDidMount() {
        if (this.props.match.params._id) {
         this.props.fetchGirl(this.props.match.params._id);
     }
     
    }
    
    saveGirl = ({ _id, name, cover, country, city, createdAt, modifiedAt }) =>  {
    if(_id) {
        return this.props.updateGirl({ _id, name, cover, country, city, modifiedAt }).then(
            () => { this.setState({ done: true })}
        )
        } else {
            
        return this.props.saveGirl({ name, cover, country, city, createdAt, modifiedAt }).then(
            () => { this.setState({ done: true })}
                
            );
        };
    }
   
    render() {
        return (
            <div>
               { this.state.done ? <Redirect to="/vk" /> : <GirlDetails girl={this.props.girl} saveGirl={this.saveGirl} /> }
            </div>
        );
    }
}

function mapStateToProps(state, props) {
  if (props.match.params._id) {
      
    return {
      girl: state.girls.find(item => item._id === props.match.params._id)
    }
  } else {
    return { girl: null }    
  }
  
}

export default connect(mapStateToProps, { fetchGirl, saveGirl, updateGirl })(Detail);

