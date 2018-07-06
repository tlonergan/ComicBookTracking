import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {showPublisher} from '../actionCreators/comicVine';
import ComicVineBookCard from './ComicVineBookCard';

const PublisherCard = React.createClass({
  handleShowPublisher: function(e, publisherId){
    if(e)
      e.preventDefault();

    if(this.props.shownPublisher === publisherId)
      publisherId = null;

      this.props.dispatch(showPublisher(publisherId));
  },
  render: function(){
    let publisher = this.props.publisher;
    let isShownPublisher = this.props.shownPublisher === publisher.Key;
    return (
      <div className={'item' + (isShownPublisher ? ' expanded' : ' collapsed')}>
        <div className={"cardHeader" + (isShownPublisher ? ' expanded' : ' collapsed')}>
          <div className="flex">
            <i className="fa fa-chevron-right"/>
            <a className='headerButton' onClick={(e) => {this.handleShowPublisher(e, publisher.Key)}}>{publisher.Key}</a>
          </div>
        </div>
        <div id={publisher.Key} className='itemBody'>
          {isShownPublisher ?
              publisher.Value.map(book =>{
              return(
                <ComicVineBookCard book={book} key={book.volume.name} selectedTab={this.props.selectedTab} showSeries={this.props.showSeries}/>
              )})
            : ''
        }
        </div>
      </div>
    );
  }
});

export default connect()(PublisherCard);
