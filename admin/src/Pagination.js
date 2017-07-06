/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import { fetchGirls, deleteGirl, copyGirl } from './actions';

class Pagination extends React.Component {
    
    render() {
   
        
        return (
            <div id="pagination" className="row">
                Pagination
            </div>
        )
    }
}

List.propTypes = {
    girls: React.PropTypes.array.isRequired,
    fetchGirls: React.PropTypes.func.isRequired,
    //deleteGame: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    
    return {
        girls:state.girls,
    }
}

export default connect(mapStateToProps, { fetchGirls, deleteGirl, copyGirl })(List);

