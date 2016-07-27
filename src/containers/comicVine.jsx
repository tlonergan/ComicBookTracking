import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Tabs from '../components/tabs';
import keys from '../core/keys';
import PublisherCard from '../components/PublisherCard';
import {getComicVineBooks} from '../actionCreators/comicVine';
import {clickTab} from '../actionCreators/tabs';
import Loading from '../components/Loading';

const ComicVine = React.createClass({
	componentWillMount: function(){
		if(this.props.comicVine.comicVineBooks === null)
			this.props.dispatch(getComicVineBooks());
	},
	componentDidMount: function(){
		this.props.dispatch(clickTab(keys.comicVineTabKeys.added));
	},
	handleClick: function(e, tabId){
		if(e)
			e.preventDefault();

			this.props.dispatch(clickTab(tabId));
	},
	handleAddWeek: function(e){
		if(e){
			e.preventDefault();
		}

		this.props.dispatch(getComicVineBooks(this.props.comicVine.releaseDay, 1));
	},
	handleBackWeek: function(e){
		if(e){
			e.preventDefault();
		}

		this.props.dispatch(getComicVineBooks(this.props.comicVine.releaseDay, -1));
	},
	render: function(){
		let tabs = [
			{display: 'Added', name: keys.comicVineTabKeys.added, icon: 'fa-plus-square'},
			{display: 'Attached', name: keys.comicVineTabKeys.attached, icon: 'fa-paperclip'},
			{display: 'Unattached', name: keys.comicVineTabKeys.unattached, icon: 'fa-ban'}
		];

		if(!this.props.comicVine.comicVineBooks || this.props.comicVine.isRetrieving){
			return (<Loading></Loading>);
		}

		let publishers = [];
		let shownTabKey = this.props.tabs.selectedTab;
		let comicVineBooks = this.props.comicVine.comicVineBooks;

		if(shownTabKey === keys.comicVineTabKeys.unattached){
			publishers = comicVineBooks.unattachedBooks;
		}
		else if(shownTabKey === keys.comicVineTabKeys.added){
			publishers = comicVineBooks.addedBooks;
		}
		else if(shownTabKey === keys.comicVineTabKeys.attached){
			publishers = comicVineBooks.attachedBooks;
		}

		if(!publishers){
			return (<div>
				Could not retreive Comic Vine Books
			</div>);
		}

		return(
			<div>
				<div className='flex centeringContainer section'>
					<div className='oneThirdPanel'>
						<a onClick={this.handleBackWeek}><i className='fa fa-minus-circle fa-2x'></i></a>
					</div>
					<div className='oneThirdPanel'>
						{this.props.comicVine.releaseDay.format('MM-D-YYYY')}
					</div>
					<div className='oneThirdPanel'>
						<a onClick={this.handleAddWeek}><i className='fa fa-plus-circle fa-2x'></i></a>
					</div>
				</div>
				<Tabs tabDefinitions={tabs} clickMethod={this.handleClick}/>
				<div className='tabPage'>
					{publishers.map(publisher =>{
						return (
							<PublisherCard key={publisher.Key} publisher={publisher} shownPublisher={this.props.comicVine.shownPublisher} selectedTab={shownTabKey} showSeries={this.props.comicVine.showSeriesSelector} />
						);
					})}
				</div>
			</div>
		);
	}
});

function mapStateToProps(state){
	return{
		comicVine: state.get('comicVine').toJS(),
		tabs: state.get('tab').toJS()
	}
}

export default connect(mapStateToProps)(ComicVine);
