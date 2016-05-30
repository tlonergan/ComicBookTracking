import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import BookSearch from '../components/bookSearch';

const Book = React.createClass({
  render: function(){
    return(
      <div>
        <BookSearch books={this.props.book.bookList}></BookSearch>
      </div>
    );
  }
});

function mapStateToProps(state){
	return{
    book: state.get('book').toJS()
	}
}

export default connect(mapStateToProps)(Book);
