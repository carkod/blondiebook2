/* eslint-disable */
import React from 'react';
import { fetchGirls, deleteGirl, copyGirl } from './actions';

class Pagination extends React.Component {
    
    render() {
   
        return (
            <div id="pagination" className="row">
                <ul class="pagination-list">
                    <li>Pagination</li>
                    <li></li>
                    <li></li>
                </ul>
            </div>
        )
    }
}

export default Pagination;

