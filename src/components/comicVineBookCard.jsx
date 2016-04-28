import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Card from './card';
import SeriesSelector from './seriesSelector';
import keys from '../core/keys';
import {attachCurrentSeries, showSeriesSelector} from '../actionCreators/comicVine';
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
  attachBookToExistingSeries: function(book){
    console.log('cvb handler')
    console.log(book);

    let dispatch = this.props.dispatch;
    dispatch(attachCurrentSeries(book.volume.id));
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
  handleChooseSeriesClick: function(book){
    let dispatch = this.props.dispatch;
    dispatch(showSeriesSelector(this.getSeriesName(book)));
  },
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
            click: () => {this.handleChooseSeriesClick(book); }},
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

    let body = (
      <div className='largeOnly'>
        <img src={book.image.thumb_url}/>
      </div>);
    if(this.getSeriesName(book) === this.props.showSeries){
      body = (
        <SeriesSelector series={this.props.series.unattachedSeries} onSeriesSelect={() => { this.attachBookToExistingSeries(book) }}/>
      )
    }

    return(
      <Card cardInfo={cardInfo}>
          {body}
      </Card>
    )
  }
});

function mapStateToProps(state){
	return{
    series: state.get('series').toJS()
	}
}

export default connect(mapStateToProps)(ComicVineBookCard);
