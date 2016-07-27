import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import BookSearchResult from './BookSearchResult'
import Loading from './loading';

const BookSearchResults = React.createClass({
  render:function(){
    if(this.props.isFetchingBooks){
      return (<Loading></Loading>);
    }

    let books = []
    if(this.props.books)
      books = this.props.books;

    if(books.length < 0)
      return (
        <div>
          <span>No books found</span>
        </div>);

    return (
      <div className='item'>
        <h3>
          <div className='fourColumns'>
            <div className='two'>Issue</div>
            <div>Location</div>
            <div className='two'></div>
          </div>
        </h3>
        <div className='itemBody table'>
          {books.map(book => {
            return (<BookSearchResult key={book.Id} Book={book} fetchBooks={this.props.fetchBooks}/>);
          })}
        </div>
      </div>
    );
  }
});

export default connect()(BookSearchResults);
