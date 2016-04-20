import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const ComicVineBookCard = React.createClass({
  render: function(){
    let book = this.props.book;

    return(
      <div className='item'>
        <h3>{book.volume.name} {book.issue_number}</h3>
        <div className='tabBody flex'>
          <div className='oneThirdPanel'>
            <img src={book.image.thumb_url}/>
          </div>
          <div>

          </div>
        </div>
      </div>
    )
  }
});

export default connect()(ComicVineBookCard);
