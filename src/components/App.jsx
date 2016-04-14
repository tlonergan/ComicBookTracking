import React from 'react';
import {List} from 'immutable';

import NavigationBar from './NavigationBar';

export default React.createClass({
	render: function(){
		let children = this.props.children;

		return (
			<div>
				<NavigationBar />
				<div className="page">
					{React.cloneElement(children, {})}
				</div>
			</div>
		);
	}
});