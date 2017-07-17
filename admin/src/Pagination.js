/* eslint-disable */
import React from 'react';
import { fetchGirls, deleteGirl, copyGirl } from './actions';

class Pagination extends React.Component {
    
    state = {
        initialPage: 1,
    } 
    
    componentDidMount = () => {
        let pageItem = this.props.match;
        //console.log(pageItem)
        if (!!this.props.girls) {
            //console.log('we have girls')    
        }
    }
    
    componentDidUpdate = () => {
        //console.log(this.props)
    }
        
    render() {
   
        return (
            <div id="pagination" className="row">
                <ul className="pagination-list">
                    <li>Pagination</li>
                    <li>1</li>
                    <li>2</li>
                </ul>
            </div>
        )
    }
}

export default Pagination;

