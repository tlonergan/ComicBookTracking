import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import Wants from '../components/wants';
import Tabs from '../components/tabs';
import Loading from '../components/loading';
import {getWantList, getWantListStatuses} from '../actionCreators/wantList';
import {clickTab} from '../actionCreators/tabs';
import keys from '../core/keys';

const wantList = React.createClass({
	propTypes:{
		dispatch: React.PropTypes.func.isRequired
	},
	displayName: 'Want Lists',
	componentWillMount: function(){
		this.setFocusIndex(-1);
		this.props.dispatch(getWantListStatuses());
	},
	componentDidMount: function(){
		let selectedTab = keys.wantListStatusIds.wanted;
		this.props.dispatch(clickTab(selectedTab)).then(() => {
			this.loadWantList(selectedTab);
		});
	},
	setFocusIndex:function(index){
		this.setState({focusIndex: index});
	},
	handleTabClicked(e, statusId){
		if(e)
			e.preventDefault();

		if(this.props.tab.selectedTab && this.props.tab.selectedTab === statusId){
			return;
		}

		this.setFocusIndex(-1);
		let dispatch = this.props.dispatch;
		dispatch(clickTab(statusId));
		this.loadWantList(statusId);
	},
	loadWantList: function(statusId){
		if(!statusId)
			statusId = this.props.tab.selectedTab;

		this.props.dispatch(getWantList(statusId));
	},
	render: function(){
		let selectedTab = this.props.tab.selectedTab;
		let tabPage = null;

		if(this.props.wantList.isRetrieving){
      return (<Loading></Loading>);
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
									 wantStatuses={this.props.wantList.statuses}
									 focusIndex={this.state.focusIndex}
									 reload={this.loadWantList}
									 setFocusIndex={this.setFocusIndex}/>
					</div>
				</div>
				);
		}
	}
});

function mapStateToProps(state) {
  return {
    wantList: state.get('wantList').toJS(),
		tab: state.get('tab').toJS()
  };
}

export default connect(mapStateToProps)(wantList);
