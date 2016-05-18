import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const BookSearch = React.createClass({
  searchClickHandler: function(){
    //search!
  },
  searchFilterChangedHandler: function(){
    //handle change
  },
  render: function(){

    return (
      <div className='panel'>
        <div className='integratedButtonGroup'>
          <span onclick={this.searchClickHandler}><i className='fa fa-search'></i></span>
          <input type='text' onChange={this.searchFilterChangedHandler}></input>
        </div>
        <div>
          <select className='fullWidth'>
            <option></option>
            <option>Unread</option>
          </select>
        </div>
      </div>
    );
  }
});

export default connect()(BookSearch);
