import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const Search = React.createClass({
	componentWillMount: function() {
	},
	handleClick: function(e, tabId){
		if(e)
			e.preventDefault();
	},
	render: function(){
		return(<p>COMING SOON</p>);
	}
});

export default connect(mapStateToProps)(Search);
