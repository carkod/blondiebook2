/* eslint-disable */
import React from 'react';

import isoCountries from 'iso-countries';
import Searchbox from './Searchbox';

const countriesbyiso = isoCountries.countries;

class Filters extends React.Component {

    state = {
        countryFilter: this.state ? this.state.countryFilter : null ,
        sort: this.state ? this.state.sortBy : null ,
    }
    
    /*filterChange = (e) => {
        this.setState({
           [e.target.name] : e.target.value, 
        });
        this.props.filterHandler(e.target.value)        
    }*/

    handleChange = (e) => {
        
        const field = e.target.name;
        const value = e.target.value;
        this.props.filters(field, value);     
    }
    
   
    render() {
        
        return (
<div id="filter" className="container">
    
    <div className="col-md-8 alert alert-info" role="alert">
        <div className="col-md-6">
            <p>Select country to display girls</p>
        </div>
        
        <div className="col-md-6">
          <select name="countryFilter" value={this.state.value} onChange={this.handleChange} className="form-control" id="country">
            <option key={0} value={null}>No Filter</option>
                {
                  Object.keys(countriesbyiso).map((country, i) => {
                  return (
                  <option key={country} value={countriesbyiso[country].name}>{countriesbyiso[country].name}</option> )
                  
                })  
                }
          
          </select>
        </div>
    </div>
    <div className="col-md-4">
        <div className="form-group">
          <label htmlFor="sort">Sort by</label>
          <select name="sortBy" value={this.state.value} onChange={this.handleChange} className="form-control" id="sort">
            <option value="name">Name</option>
            <option value="createdDesc">Created Date (DESC)</option>
            <option value="createdAsc">Created Date (ASC)</option>
            <option value="modifiedDesc">Modified Date (DESC)</option>
            <option value="modifiedAsc">Modified Date (ASC)</option>
          </select>
        </div>
    </div>
</div>
        );
    }
}

export default Filters;


