import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

const ComicVine = React.createClass({
	render: function(){
		return (
			<div>
				Coming Soon?
			</div>
		);
	}
});

export default connect()(ComicVine);