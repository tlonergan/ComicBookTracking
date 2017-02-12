import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {getBooks, setSearchFilter} from '../actionCreators/book';
import BookSearchResults from './BookSearchResults';
import Loading from './loading';

const BookSearch = React.createClass({
  componentWillMount: function() {
		this.setFocusIndex(-1);
  },
	setFocusIndex:function(index){
		this.setState({focusIndex: index});
	},
  searchClickHandler: function(e){
    this.setFocusIndex(-1);
    if(e && e.preventDefault)
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
    let locations = this.props.locations;

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
              {locations.map(location => {
                return (<option key={location.Id} value={location.Id}>{location.Name}</option>)
              })}
            </select>
          </div>
        </div>
        <BookSearchResults books={this.props.books}
                           locations={locations}
                           isFetchingBooks={this.props.isFetchingBooks}
                           fetchBooks={this.searchClickHandler}
                           setFocusIndex={this.setFocusIndex}
                           focusIndex={this.state.focusIndex}/>
      </div>
    );
  }
});

export default connect()(BookSearch);
