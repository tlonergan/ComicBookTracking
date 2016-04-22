import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const ComicVineBookCard = React.createClass({
  handleAddSeriesClick: function(){

  },
  handleAttachSeriesClick: function(){

  },
  render: function(){
    let book = this.props.book;
    return(
      <div className='item'>
        <h3>{book.volume.name} {book.issue_number}</h3>
        <div className='tabBody'>
          <div className='largeOnly'>
            <img src={book.image.thumb_url}/>
          </div>
        </div>
        <div className='flex itemButtons'>
          <a onClick={this.handleAddSeriesClick}>Add</a>
          <a onClick={this.handleAttachSeriesClick}>Attach</a>
        </div>
      </div>
    )
  }
});

export default connect()(ComicVineBookCard);
