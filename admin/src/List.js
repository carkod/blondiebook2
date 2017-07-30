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
        sortBy: this.state ? this.state.sortBy : 'name',
        pageItem: this.props.params,
        pageOfItems: [],
    }
  
    onChangePage = (pageOfItems) => {
        // update state with new page of items
        this.setState({ pageOfItems: pageOfItems });
    }
    
    
    handleChange = (field, value) => {
        console.log(field + value)
        this.setState({ [field]: value });
    }
    
    componentWillMount = () => {
        this.props.fetchGirls();
        
    }
    
    render() {
    
        var items = this.state.pageOfItems ? this.state.pageOfItems : this.props.girls.slice(0, 5);
        
        let filteredGirls = items.filter(girl => {
            if ( !!this.state.countryFilter ) {
                return (girl.country === this.state.countryFilter)
            } else {
                return girl;
            }
            
        });
     
        let sortedGirls = filteredGirls.sort((a,b) => { 
            switch ( this.state.sortBy ) {
                case "name" :
                    console.log(a.name)
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
        } else if (!filteredGirls) {
            return (
                <div className="alert alert-info" role="alert">
                    Girls cannot be filtered
                </div>
            );
        } else {
        
            return (
                <div id="girlsList" className="row">
                <Filters filters={this.handleChange} />
                <Pagination girls={this.props.girls} onChangePage={this.onChangePage} onLoad={this.initialPaging} />
                    { girlsList }
                <div className="clearfix" />
                <Pagination girls={this.props.girls} onChangePage={this.onChangePage} onLoad={this.initialPaging} />
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

