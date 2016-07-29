import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import BookSearch from '../components/bookSearch';
import Loading from '../components/loading';
import {getLocations} from '../actionCreators/location';

const Book = React.createClass({
  componentWillMount: function() {
    this.props.dispatch(getLocations());
  },
	setFocusIndex:function(index){
		this.setState({focusIndex: index});
	},
  render: function(){
    if(this.props.location.isFetching)
      return (<Loading></Loading>);

    return(
      <div>
        <BookSearch books={this.props.book.bookList}
                    locations={this.props.location.list}
                    isFetchingBooks={this.props.book.isFetching}></BookSearch>
      </div>
    );
  }
});

function mapStateToProps(state){
	return{
    book: state.get('book').toJS(),
    location: state.get('location').toJS()
	}
}

export default connect(mapStateToProps)(Book);
