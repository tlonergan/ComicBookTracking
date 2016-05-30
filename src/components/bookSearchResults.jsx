import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const BookSearchResults = React.createClass({
  render:function()(

    return (
      <div>
        <div class='flex'>
          <span>Issue</span>
          <span>Location</span>
        </div>
        this.props.books.map(book => return (<BookSearchResult Book={book}/>);)
      </div>
    );
  )
});

export default connect()(BookSearchResults);
