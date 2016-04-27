import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Card from './card';
import keys from '../core/keys';
import {attachCurrentSeries} from '../actionCreators/comicVine';
import {getSeriesByName, createSeries} from '../actionCreators/series';

const ComicVineBookCard = React.createClass({
  handleAddBookClick: function(){

  },
  handleAttachSeriesClick: function(book){
    let dispatch = this.props.dispatch;
    dispatch(getSeriesByName(this.getSeriesName(book)))
      .then(() => {
        dispatch(attachCurrentSeries(book.volume.id));
      });
  },
  handleCreateSeriesClick: function(book){
    let dispatch = this.props.dispatch;
    let newSeriesName = this.getSeriesName(book);
    dispatch(createSeries(
      {
        Name: newSeriesName,
        IsCurrent: true,
        Publisher: {
          Name: book.volume.publisherName
        }
      },
      book.volume.id
    )).then(() => {
      this.handleAttachSeriesClick(book)
    });
  },
  handleChooseSeriesClick: function(){
    let dispatch = this.props.dispatch;
    dispatch(showSeriesSelector());
    dispatch(getAllUnattachedSeries());
  }
  getSeriesName(book){
    return book.volume.name + ' (' + book.volume.start_year + ')';
  },
  render: function(){
    let book = this.props.book;
    let buttons = [];

    switch (this.props.selectedTab){
      case keys.comicVineTabKeys.unattached:
        buttons = [
          {
            display: 'Choose series',
            click: () => {this.handleChooseSeriesClick(this.props.key); }},
          {
            display: 'Create',
            click: () => {
              this.handleCreateSeriesClick(book);
            }
          }
        ];
        break;
      case keys.comicVineTabKeys.attached:
        buttons = [
          {
            display: 'Want',
            click: () =>{
              this.handleAddBookClick(book);
            }
          }
        ]
      break;
    }

    let cardInfo = {
      title: book.volume.name + ' #' + book.issue_number,
      buttons: buttons
    };

    return(
      <Card cardInfo={cardInfo}>
        <div className='largeOnly'>
          <img src={book.image.thumb_url}/>
        </div>
      </Card>
    )
  }
});

export default connect()(ComicVineBookCard);
