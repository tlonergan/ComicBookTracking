import React from 'react';
import ReactDOM from 'react-dom';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import WantItem from '../components/wantItem';

const Wants = React.createClass({
  componentDidMount: function() {
    let focusRef = this.refs[this.props.focusIndex];
    if(focusRef){
      ReactDOM.findDOMNode(focusRef).scrollIntoView();
        console.log(focusRef)
    }
  },
  render: function() {
  	if(this.props.lists == null){
  		return (<p className='error'>Unable to retrieve list</p>);
  	}
  	let wantList = this.props.lists;
    let wantIndex = -1;
    let focusIndex = this.props.focusIndex;
    return (
    	<div>
	    	{wantList.map(item => {
          wantIndex = wantIndex + 1;

	    		return (
            <div key={item.Id} ref={wantIndex}>
              <WantItem reload={this.props.reload}
                        setIndex={this.props.setFocusIndex}
                        item={item}
                        index={wantIndex}
                        statuses={this.props.wantStatuses}/>
            </div>
          );
	    	})}
    	</div>
    );
  }
});

export default connect()(Wants);
