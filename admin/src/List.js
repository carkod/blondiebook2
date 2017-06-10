/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
//import GamesList from './GamesList.js';
import GirlItem from './GirlItem.js';
import { fetchGirls, deleteGame } from './actions';


class List extends React.Component {
    
    componentDidMount() {
        this.props.fetchGirls();
        
    }
    render() {
        
        const emptyMessage = (
        <p>There are no girls in the list</p>
    );
    
        const gamesList = (
            <div className="ui four cards">
                {this.props.girls.map((girl) => <GirlItem girl={girl} key={girl._id} />)}
            </div>
        );
        console.log(this.props.girls);
        return(
            <div>
                <div>
                
                {this.props.girls.length === 0 ? emptyMessage : gamesList }
                </div>
            </div>    
        );
    }
}

List.propTypes = {
    girls: React.PropTypes.array.isRequired,
    fetchGirls: React.PropTypes.func.isRequired,
    deleteGame: React.PropTypes.func.isRequired
}

function mapStateToProps(state) {
    return {
        girls:state.girls
    }
}

export default connect(mapStateToProps, {fetchGirls, deleteGame})(List);