import React, { Component } from 'react'

export default class Pagination extends Component {
  render() {
    const { totalPosts, postsPerPage, paginate } = this.props;
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
      pageNumbers.push(i);
    }
    return (
      <nav>
        <ul className='pagination'>
          {pageNumbers.map(number => (
            <li key={number} className='page-item'>
              <div onClick={() => paginate(number)} style={{ cursor: 'pointer' }} className='page-link'>
                {number}
              </div>
            </li>
          ))}
        </ul>
      </nav>
    )
  }
}