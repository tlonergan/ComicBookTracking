import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import BookSearchResult from './BookSearchResult'

const BookSearchResults = React.createClass({
  render:function(){

    let books = []
    if(this.props.books)
      books = this.props.books;

    if(books.length < 0)
      return (
        <div>
          <span>No books found</span>
        </div>);

    return (
      <div>
        <div className='flex'>
          <span>Issue</span>
          <span>Location</span>
        </div>
        {books.map(book => {
          return (<BookSearchResult key={book.Id} Book={book}/>);
        })}
      </div>
    );
  }
});

export default connect()(BookSearchResults);
