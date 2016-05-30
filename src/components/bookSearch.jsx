import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {getBooks, setSearchFilter} from '../actionCreators/book';

const BookSearch = React.createClass({
  searchClickHandler: function(){
    //search!
  },
  searchFilterChangedHandler: function(e){
    setSearchFilter(e.target.value);
    console.log(e.target.value);
  },
  locationChanged: function(e){
    this.setState({locationId: e.target.value});
    console.log(e.target.value);
    console.log(this);
  },
  render: function(){

    return (
      <div className='panel'>
        <div>
          <div className='integratedButtonGroup'>
            <span onclick={this.searchClickHandler}><i className='fa fa-search'></i></span>
            <input type='text' onChange={this.searchFilterChangedHandler}></input>
          </div>
          <div>
            <select className='fullWidth' onChange={this.locationChanged}>
              <option></option>
              <option>Unread</option>
            </select>
          </div>
        </div>
        <BookSearchResults books={this.props.books}/>
      </div>
    );
  }
});

export default connect()(BookSearch);
