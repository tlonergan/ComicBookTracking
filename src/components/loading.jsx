import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const Loading = React.createClass({
  render: function(){
    return (
			<div className='centeringContainer'>
				<i className='fa fa-refresh fa-spin fa-3x'></i>
				<p>Loading</p>
			</div>);
  }
});

export default Loading;
