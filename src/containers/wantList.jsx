import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Wants from '../components/wants';
import {getWantList, clickTab, getWantListStatuses} from '../actionCreators/wantList';
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
			return (
				<div>
					<div className='tabContainer'>
						<a className={'tab' + (selectedTab === keys.wantListStatusIds.wanted ? ' selectedTab' : '')} 
						   onClick={(e) => {this.handleTabClicked(e, keys.wantListStatusIds.wanted);}}>
							<i className='fa fa-cart-plus'></i><span>Wants</span>
						</a>
						<a className={'tab' + (selectedTab === keys.wantListStatusIds.heldAtStore ? ' selectedTab' : '')}
						   onClick={(e) => {this.handleTabClicked(e, keys.wantListStatusIds.heldAtStore);}}>
							<i className='fa fa-hand-paper-o'></i>Held At Store
						</a>
						<a className={'tab' + (selectedTab === keys.wantListStatusIds.wantedHold ? ' selectedTab' : '')}
						   onClick={(e) => {this.handleTabClicked(e, keys.wantListStatusIds.wantedHold);}}>
							<i className='fa fa-balance-scale'></i>Wanted Hold
						</a>
						<a className={'tab' + (selectedTab === keys.wantListStatusIds.backIssue ? ' selectedTab' : '')}
						   onClick={(e) => {this.handleTabClicked(e, keys.wantListStatusIds.backIssue);}}>
							<i className='fa fa-star'></i>Back Issues
						</a>
					</div>
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