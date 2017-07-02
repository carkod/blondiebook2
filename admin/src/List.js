/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import GirlItem from './GirlItem.js';
import Filters from './Filters.js';
import { fetchGirls, deleteGirl, copyGirl } from './actions';


class List extends React.Component {
    
    state = {
        countryFilter: this.state ? this.state.countryFilter : '',
        sort: this.state ? this.state.sort : '',
    }
    
    
    handleChange = (field, value) => {
        //console.log(value)
        this.setState({
           [field]: value,
       });
    }
    
    componentDidMount() {
    this.props.fetchGirls();
    }
    
    render() {
        const filteredGirls = this.props.girls.filter(girl => {
            if ( !!this.state.countryFilter === "nofilter") {
                return (girl.country === this.state.countryFilter)    
            } else {
                return girl;
            }
            
        });
    
        const girlsList = (
            <div>
                {filteredGirls.map((girl) => <GirlItem girl={girl} key={girl._id} deleteGirl={this.props.deleteGirl} copyGirl={this.props.copyGirl} />)}
            </div>
        );
        
        if (!this.props.girls) {
            return (
                <div id="emptyMessage">
                <Filters filters={this.handleChange} />
                    <div className="alert alert-info" role="alert">
                        No Girls from props
                    </div>
                </div>
            );
        } else if (!filteredGirls){
            return (
                
                <div className="alert alert-info" role="alert">
                    Girls cannot be filtered
                </div>
            );
        } else {
            return (
                <div id="girlsList" className="row">
                <Filters filters={this.handleChange} />
                    { girlsList }
                </div>
            )
        }
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

