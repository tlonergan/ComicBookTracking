import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Wants from '../components/wants';
import Tabs from '../components/tabs';
import {getWantList, getWantListStatuses} from '../actionCreators/wantList';
import {clickTab} from '../actionCreators/tabs';
import keys from '../core/keys';

const wantList = React.createClass({
	propTypes:{
		dispatch: React.PropTypes.func.isRequired
	},
	displayName: 'Want Lists',
	componentWillMount: function(){
		this.props.dispatch(getWantListStatuses());
	},
	componentDidMount: function(){
		this.loadWantList()
	},
	handleTabClicked(e, statusId){
		if(e)
			e.preventDefault();

		let dispatch = this.props.dispatch;
		dispatch(clickTab(statusId));
		this.loadWantList(statusId);
	},
	loadWantList: function(statusId){
		if(!statusId)
			statusId = this.props.wantList.selectedTab;

		this.props.dispatch(getWantList(statusId));
	},
	render: function(){
		let selectedTab = this.props.wantList.selectedTab;
		let tabPage = null;

		if(this.props.wantList.isRetrieving){
			return (
				<div className='absoluteCentered'>
					<p>Loading! Please Wait!</p>
				</div>
				);
		}
		else{
			var tabs = [
				{name: keys.wantListStatusIds.wanted, display: 'Wants', icon: 'fa-cart-plus'},
				{name: keys.wantListStatusIds.heldAtStore, display: 'Held At Store', icon: 'fa-hand-paper-o'},
				{name: keys.wantListStatusIds.wantedHold, display: 'Wanted Hold', icon: 'fa-balance-scale'},
				{name: keys.wantListStatusIds.backIssue, display: 'Back Issue', icon: 'fa-star'}
			];

			return (
				<div>
					<Tabs tabDefinitions={tabs} clickMethod={this.handleTabClicked}/>
					<div className='tabPage'>
						<Wants lists={this.props.wantList.lists}
							reload={this.loadWantList}
							wantStatuses={this.props.wantList.statuses}/>
					</div>
				</div>
				);
		}
	}
});

function mapStateToProps(state) {
  return {
    wantList: state.get('wantList').toJS()
  };
}

export default connect(mapStateToProps)(wantList);
