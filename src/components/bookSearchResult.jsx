import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const BookSearchResult = React.createClass({
  render: function(){
    let book = this.props.book;
    return(
      <div class='flex'>
        <div>
          <span>{book.Series.Name} #{book.Issue}</span>
        </div>
        <div>
          <span>{book.Location.Name}</span>
        </div>
        <div>
          <span>{book.StatusDisplay}</span>
        </div>
      </div>
    )
  }
})
