import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import WantItem from '../components/wantItem';

const Wants = React.createClass({
  render: function() {
  	if(this.props.lists == null){
  		return (<p className='error'>Unable to retrieve list</p>);
  	}
  	2
	let wantList = this.props.lists;
    return (
    	<div>
	    	{wantList.map(item => {
	    		return (<WantItem key={item.Id} reload={this.props.reload} item={item} statuses={this.props.wantStatuses}/>);
	    	})}
    	</div>
    );
  }
});

export default connect()(Wants);