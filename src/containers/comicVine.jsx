import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const ComicVine = React.createClass({
	render: function(){
		return (
			<div>
				Coming soon as soon as you break out the tabs
			</div>
		);
	}
});

export default connect()(ComicVine);
