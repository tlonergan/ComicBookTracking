import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import BookSearchResult from './BookSearchResult'
import Loading from './loading';

const BookSearchResults = React.createClass({
  componentDidUpdate: function(nextProps, nextState) {
    let focusRef = this.refs[(this.props.focusIndex)];
    if(focusRef){
      ReactDOM.findDOMNode(focusRef).scrollIntoView();
    }
  },
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

    let bookIndex = -1;
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
            bookIndex = bookIndex + 1;
            return (<BookSearchResult key={book.Id}
                                      ref={bookIndex}
                                      Book={book}
                                      locations={this.props.locations}
                                      fetchBooks={this.props.fetchBooks}
                                      setFocusIndex={this.props.setFocusIndex}
                                      focusIndex={bookIndex}/>);
          })}
        </div>
      </div>
    );
  }
});

export default connect()(BookSearchResults);
