import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {getBooks, setSearchFilter} from '../actionCreators/book';
import BookSearchResults from './BookSearchResults';

const BookSearch = React.createClass({
  componentDidMount: function() {
  },
  searchClickHandler: function(e){
    e.preventDefault();

    let locationId = null;
    let searchFilter = null;

    if(this.state){
      if(this.state.locationId){
        locationId = this.state.locationId;
      }

      if(this.state.searchFilter){
        searchFilter = this.state.searchFilter;
      }
    }

    this.props.dispatch(getBooks(searchFilter, locationId));
  },
  searchFilterChangedHandler: function(e){
    this.setState({searchFilter: e.target.value});
  },
  locationChanged: function(e){
    this.setState({locationId: e.target.value});
  },
  render: function(){
    return (
      <div className='panel'>
        <div>
          <div className='integratedButtonGroup'>
            <span onClick={this.searchClickHandler}><i className='fa fa-search'></i></span>
            <input type='text' onChange={this.searchFilterChangedHandler}></input>
          </div>
          <div>
            <select className='fullWidth' onChange={this.locationChanged}>
              <option></option>
              <option value='1'>Unread</option>
            </select>
          </div>
        </div>
        <BookSearchResults books={this.props.books}/>
      </div>
    );
  }
});

export default connect()(BookSearch);
