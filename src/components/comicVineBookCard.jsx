import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Card from './card';
import keys from '../core/keys';
import {addSeries} from '../actionCreators/comicVine';

const ComicVineBookCard = React.createClass({
  handleAddSeriesClick: function(){

  },
  handleAttachSeriesClick: function(){

  },
  handleCreateSeriesClick: function(book){

    console.log('in base handler');
    this.props.dispatch(addSeries(
      {
        Name: book.volume.name + ' (' + book.volume.start_year + ')',
        IsCurrent: true,
        Publisher: {
          Name: book.volume.publisherName
        }
      },
      book.volume.id
    ));
  },
  render: function(){
    let book = this.props.book;
    let buttons = [];

    switch (this.props.selectedTab){
      case keys.comicVineTabKeys.unattached:
        buttons = [
          {display: 'Attach', click: this.handleAttachSeriesClick},
          {
            display: 'Create',
            click: () => {
              this.handleCreateSeriesClick(book);
              console.log('click handler!')
            }
          }
        ];
        break;
      case keys.comicVineTabKeys.attached:
        buttons = [
          {display: 'Want', click: this.handleAddSeriesClick}
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
