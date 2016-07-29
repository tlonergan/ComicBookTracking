import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {updateBook} from '../actionCreators/book';

const BookSearchResult = React.createClass({
  clickQuickChange: function(statusId, locationId, e){
    let book = this.props.Book;
    book.Location.Id = locationId;
    book.Status = statusId;
    this.props.dispatch(updateBook(book)).then(() => this.props.fetchBooks(e));
    this.props.setFocusIndex(this.props.focusIndex)
  },
  render: function(){
    let book = this.props.Book;

    if(!book)
      return(<div>A thing</div>);

    let locationColumnContent = (<div>{book.StatusDisplay}</div>);
    if(book.Location){
      locationColumnContent = (
        <div>
          <div>{book.Location.Name}</div>
          <div className='small'>{book.StatusDisplay}</div>
        </div>);
    }

    let quickChanges = (<div></div>);
    if(book.AvailableWorkflows){
      quickChanges = (
        <div className='flex'>
          {book.AvailableWorkflows.map(wf => {return (<div key={book.Id + 'quickChange' + wf.Id}><a onClick={() => this.clickQuickChange(wf.NextStatusId, wf.NextLocationId)}>{wf.Display}</a></div>)})}
        </div>);
    }

    let extraBookIdentifier = (<span></span>);
    if(book.IsSpecialCover && book.Notes && book.Notes !== ''){
      extraBookIdentifier = (<div>({book.Notes})</div>);
    }

    return(
      <div className='fourColumns'>
        <div className='two'>
          <span>{book.Series.Name} #{book.Issue} {extraBookIdentifier}</span>
        </div>
        {locationColumnContent}
        <div className='flex two'>
          {quickChanges}
        </div>
      </div>
    );
  }
})


export default connect()(BookSearchResult);
