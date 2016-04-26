import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const Card = React.createClass({
  render: function(){
    let cardInfo = this.props.cardInfo;
    return(
      <div className='item'>
        <h3>{cardInfo.title}</h3>
        <div className='tabBody'>
          {this.props.children}
        </div>
        <div className='flex itemButtons'>
          {cardInfo.buttons.map(button => {
            return (
              <a key={button.display} onClick={button.click}>{button.display}</a>
            );
          })}
        </div>
      </div>
    );
  }
})

export default connect()(Card)
