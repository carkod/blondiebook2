/* eslint-disable */
import React from 'react';
import { fetchGirls, deleteGirl, copyGirl } from './actions';

const pageSize = 5;

class Pagination extends React.Component {

    
    state = {
        initialPage: 1,
        pager: {},
    } 
    
    setPage(page) {
        const items = this.props.girls ? this.props.girls : '';
        let pager = this.state.pager;
        
        pager = this.getPager(items.length, page, pageSize);
        
        if (page < 1 || page > pager.totalPages) {
            return;
        }
 
        // get new pager object for specified page
 
        // get new page of items from items array
        var pageOfItems = items.slice(pager.startIndex, pager.endIndex + 1);
 
        // update state
        this.setState({ pager: pager });
 
        // call change page function in parent component
        this.props.onChangePage(pageOfItems);
        
    }
    
    getPager(totalItems, currentPage, pageSize) {
        // default to first page
        currentPage = currentPage || 1;
 
        // default page size is 10
        pageSize = pageSize || 10;
 
        // calculate total pages
        var totalPages = Math.ceil(totalItems / pageSize);
 
        var startPage, endPage;
        
        if (totalItems <= pageSize) {
            startPage = 1;
            endPage = totalPages;
        } else {
            if (currentPage <= 6) {
                startPage = 1;
                endPage = 10;
            } else if (currentPage + 4 >= totalPages) {
                startPage = totalPages - 9;
                endPage = totalPages;
            } else {
                startPage = currentPage - 5;
                endPage = currentPage + 4;
            }
        }
        
        // calculate start and end item indexes
        var startIndex = (currentPage - 1) * pageSize;
        var endIndex = Math.min(startIndex + pageSize - 1, totalItems - 1);
 
        // create an array of pages to ng-repeat in the pager control
        //var pages = _.range(startPage, endPage + 1);
 
        var pages = Array.from(Array(endPage + 1), (_,i) => startPage + i)
 
        // return object with all pager properties required by the view
        return {
            totalItems: totalItems,
            currentPage: currentPage,
            pageSize: pageSize,
            totalPages: totalPages,
            startPage: startPage,
            endPage: endPage,
            startIndex: startIndex,
            endIndex: endIndex,
            pages: pages
        };
    }
 
    componentDidMount = () => {
        this.setPage(this.state.initialPage);
    }
    
    componentDidUpdate = () => {
        //console.log(this.props)
    }
        
    render() {
        const pager = !!this.state.pager ? this.state.pager : '';
        const items = this.props.girls;
   
        return (
            <div id="pagination" className="row">
                <ul className="pagination-list">
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(1)}>First</a>
                    </li>
                    <li className={pager.currentPage === 1 ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage - 1)}>Previous</a>
                    </li>
                    {/*pager.pages.map((page, index) =>
                        <li key={index} className={pager.currentPage === page ? 'active' : ''}>
                            <a onClick={() => this.setPage(page)}>{page}</a>
                        </li>
                    )*/}
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.currentPage + 1)}>Next</a>
                    </li>
                    <li className={pager.currentPage === pager.totalPages ? 'disabled' : ''}>
                        <a onClick={() => this.setPage(pager.totalPages)}>Last</a>
                    </li>
                </ul>
            </div>
        )
    }
}

export default Pagination;

