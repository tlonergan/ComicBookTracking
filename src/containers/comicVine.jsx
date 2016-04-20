import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Tabs from '../components/tabs';
import keys from '../core/keys';
import PublisherCard from '../components/PublisherCard';
import {getComicVineBooks} from '../actionCreators/comicVine';

const ComicVine = React.createClass({
	componentWillMount: function(){
		if(this.props.comicVine.comicVineBooks === null)
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


		let fetchingMessage = (<p>Fetching Books</p>);

		if(!this.props.comicVine.comicVineBooks){
			return fetchingMessage;
		}

		let unattachedBooks = this.props.comicVine.comicVineBooks.unattachedBooks;
		if(this.props.isRetrieving || !unattachedBooks || unattachedBooks.length === 0){
			return fetchingMessage;
		}
		return(
			<div>
				<Tabs tabDefinitions={tabs} clickMethod={this.handleClick}/>
				<div className='tabPage'>
					{unattachedBooks.map(publisher =>{
						return (
							<PublisherCard publisher={publisher} shownPublisher={this.props.comicVine.shownPublisher} key={publisher.key}/>
						);
					})}
				</div>
			</div>
		);
	}
});

function mapStateToProps(state){
	return{
		comicVine: state.get('comicVine').toJS()
	}
}

export default connect(mapStateToProps)(ComicVine);
