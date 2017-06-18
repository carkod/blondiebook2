/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import GirlItem from './GirlItem.js';
import { fetchGirls, deleteGirl, copyGirl } from './actions';


class List extends React.Component {
    
    componentDidMount() {
    this.props.fetchGirls();
    }
    
    componentWillReceive() {
        //console.log(this.props.copyGirl);
    }

    render() {
        
        const emptyMessage = (
        <p>There are no girls in the list</p>
    );
    
        const gamesList = (
            <div className="row">
                {this.props.girls.map((girl) => <GirlItem girl={girl} key={girl._id} deleteGirl={this.props.deleteGirl} copyGirl={this.props.copyGirl} />)}
            </div>
        );
        
        return(
            
            <div>
                <div>
                {console.log(this.props.copyGirl)}
                { !!this.props.girls ? gamesList : emptyMessage }
                </div>
            </div>    
        );
    }
}

List.propTypes = {
    girls: React.PropTypes.array.isRequired,
    fetchGirls: React.PropTypes.func.isRequired,
    //deleteGame: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        girls:state.girls
    }
}

export default connect(mapStateToProps, {fetchGirls, deleteGirl, copyGirl })(List);

