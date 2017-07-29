/* eslint-disable */
import React from 'react';
import { connect } from 'react-redux';
import GirlItem from './GirlItem.js';
import Filters from './Filters.js';
import Pagination from './Pagination.js';
import { fetchGirls, deleteGirl, copyGirl } from './actions';

class List extends React.Component {
    
    state = {
        countryFilter: !!this.state ? this.state.countryFilter : null,
        sortBy: this.state ? this.state.sortBy : null,
        pageItem: this.props.params,
        pageOfItems: {},
    }
    
    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    
    
    handleChange = (field, value) => {
        this.setState({ [field]: value,
       });
    }
    
    componentDidMount() {
        this.props.fetchGirls();
        this.setState({
            pageOfItems: this.state.pageOfItems ? this.state.pageOfItems : this.props.girlsList,
        })
    }
    
    render() {
        
        const filteredGirls = this.props.girls.filter(girl => {
            if ( !!this.state.countryFilter ) {
                return (girl.country === this.state.countryFilter)
            } else {
                return girl;
            }
            
        });
     
        const sortedGirls = filteredGirls.sort((a,b) => { 
                switch ( this.state.sortBy ) {
                    case "name" :
                        const nameA = a.name.replace(/\s+/g, '').trim().toUpperCase();
                        const nameB = b.name.replace(/\s+/g, '').trim().toUpperCase();    
                        if (nameA < nameB) { return -1; } else if (nameA > nameB) { return 1; } else {return 0;}
                        break;
                    case "createdDesc" :
                        if (a.createdAt > b.createdAt) { return -1; } else if (a.createdAt < b.createdAt) { return 1; } else {return 0;}
                        break;
                    case "createdAsc" :
                        if (a.createdAt < b.createdAt) { return -1; } else if (a.createdAt > b.createdAt) { return 1; } else {return 0;}
                        break;
                    case "modifiedDesc" :
                        if (a.modifiedAt > b.modifiedAt) { return -1; } else if (a.modifiedAt < b.modifiedAt) { return 1; } else {return 0;}
                        break;
                    case "modifiedAsc" :
                        if (a.modifiedAt < b.modifiedAt) { return -1; } else if (a.modifiedAt > b.modifiedAt) { return 1; } else {return 0;}
                        break;
                    default:
                        return filteredGirls;
                            
            }
            
        });
     
     
        const girlsList = (
            <div>
                {sortedGirls.map((girl) => <GirlItem girl={girl} key={girl._id} deleteGirl={ this.props.deleteGirl } copyGirl={this.props.copyGirl} />)}
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
        } 
        
        if (!filteredGirls){
            return (
                <div className="alert alert-info" role="alert">
                    Girls cannot be filtered
                </div>
            );
        } 
        
        return (
            <div id="girlsList" className="row">
            <Filters filters={this.handleChange} />
                { girlsList }
            <div className="clearfix" />
            { !!this.props.girls ? <Pagination girls={this.props.girls} query={this.props.match.params} onChangePage={this.onChangePage}/> : ''}
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

