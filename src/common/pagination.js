import React, { Component } from 'react';
import _ from 'lodash';
class Pagination extends Component {
  render() { 
    let { itemsCount, pageSize, currentPage } = this.props;
    let pageCount = itemsCount/pageSize;
    if(pageCount<=1){
      return null;
    }
    pageCount = _.range(1, pageCount+1);
    return ( 
      <nav aria-label="Page navigation example">
      <ul className="pagination">
        {
          pageCount.map(page => <li key = { page }className = {page===currentPage?'page-item active': 'page-item'}><a className="page-link" href="#" onClick = {() => this.props.pageHandler(page)}>{page}</a></li>)
        }
      </ul>
      </nav>
     );
  }
}
 
export default Pagination;