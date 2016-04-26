import React from 'react';
import {connect} from 'react-redux';
import {toJS} from 'immutable';

import {startChangeWantStatus, cancelChangeWantStatus, saveStatusChange} from '../actionCreators/wantList';
import keys from '../core/keys';
import Card from './card';

const WantItem = React.createClass({
	cancelChangeStatus(e){
		e.preventDefault();
		this.props.dispatch(cancelChangeWantStatus(this.props.item.Id));
	},
	startChangeStatus(e){
		e.preventDefault();
		this.props.dispatch(startChangeWantStatus(this.props.item.Id));
	},
	handleChangeStatus: function(e){
		e.preventDefault();
		let selectedStatus = this.state.selectedStatus;
		if(!selectedStatus)
			return;

		this.saveStatusChange(selectedStatus);
	},
	saveStatusChange:function(newStatusId){
		this.props.item.StatusId = newStatusId;
		this.props.dispatch(saveStatusChange(this.props.item));
		this.props.reload();
	},
	selectedStatusChanged: function(e){
		this.setState({selectedStatus: e.target.value});
	},
	render: function(){
		let item = this.props.item;
		let statuses = this.props.statuses;
		let cardBody = null;
		if(this.props.changingStateKey === item.Id){
			cardBody = (
				<div className="tabBody">
					<div>
						<select onChange={this.selectedStatusChanged}>
							<option></option>
							{statuses.map(status => {
								if(status.Key == item.StatusId)
									return;

								return (<option key={status.Key} value={status.Key}>{status.Value}</option>);
							})}
						</select>
					</div>
					<div>
						<button onClick={this.handleChangeStatus}>Change Status</button>
						<a onClick={this.cancelChangeStatus}>Cancel</a>
					</div>
				</div>
				);
		}
		else{
			cardBody = (
				<div  className="tabBody">
					<a onClick={this.startChangeStatus}>Change Status</a>
				</div>
				);
		}

		let cardInfo = {
			title: item.Book.Series.Name + ' #' + item.Book.Issue,
			buttons: [
				{display: 'Bought', click: () => {this.saveStatusChange(keys.wantListStatusIds.recieved)}},
				{display: 'Hold', click: () => {this.saveStatusChange(keys.wantListStatusIds.heldAtStore)}}
			]
		};

		return (
			<div className='item'>
				<h3>
					{item.Book.Series.Name} #{item.Book.Issue}
				</h3>
				<div>
					{cardBody}
				</div>
				<div className='flex itemButtons'>
					<a onClick={e => {
						this.saveStatusChange(keys.wantListStatusIds.recieved);
					}}>Bought</a>
					<a onClick={e => {
						this.saveStatusChange(keys.wantListStatusIds.heldAtStore);
					}}>Hold</a>
				</div>
			</div>
		);
	}
});

function mapStateToProps(state) {
  return {
  	changingStateKey: state.get('wantList').toJS().changingStateKey
  };
}

export default connect(mapStateToProps)(WantItem);
