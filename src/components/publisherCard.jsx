import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {showPublisher} from '../actionCreators/comicVine';
import ComicVineBookCard from './ComicVineBookCard';

const PublisherCard = React.createClass({
  handleShowPublisher: function(e, publisherId){
    if(e)
      e.preventDefault();

      this.props.dispatch(showPublisher(publisherId));
  },
  render: function(){
    let publisher = this.props.publisher;
    let isShownPublisher = this.props.shownPublisher === publisher.Key;
    return (
      <div className='item'>
        <div>
          <a className={'headerButton' + (isShownPublisher ? ' expanded' : ' collapsed')} onClick={(e) => {this.handleShowPublisher(e, publisher.Key)}}>{publisher.Key}</a>
        </div>
        <div id={publisher.Key} className='tabBody'>
          {isShownPublisher ?
              publisher.Value.map(book =>{
              return(
                <ComicVineBookCard book={book} key={book.volume.name} selectedTab={this.props.selectedTab}/>
              )})
            : ''
        }
        </div>
      </div>
    );
  }
});

export default connect()(PublisherCard);
