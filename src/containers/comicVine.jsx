import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Tabs from '../components/tabs';
import keys from '../core/keys';

import {getComicVineBooks} from '../actionCreators/comicVine';

const ComicVine = React.createClass({
	componentDidMount: function(){
		this.props.dispatch(getComicVineBooks());
	},
	handleClick: function(e, tabId){
		if(e)
			e.preventDefault();
	},
	render: function(){
		let tabs = [
			{name: 'added', display: keys.comicVineTabKeys.added, icon: 'fa-plus-square'}
		];

		return(
			<div>
				<Tabs tabDefinitions={tabs} clickMethod={this.handleClick}/>
				<div className='tabPage'>
					<p>This is where content would go!</p>
				</div>
			</div>
		);
	}
});

export default connect()(ComicVine);
