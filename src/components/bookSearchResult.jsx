import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const BookSearchResult = React.createClass({
  render: function(){
    let book = this.props.Book;

    if(!book)
      return(<div>A thing</div>);

    return(
      <div className='flex'>
        <div>
          <span>{book.Series.Name} #{book.Issue}</span>
        </div>
        <div>
        </div>
        <div>
          <span>{book.StatusDisplay}</span>
        </div>
      </div>
    );
  }
})


export default connect()(BookSearchResult);
