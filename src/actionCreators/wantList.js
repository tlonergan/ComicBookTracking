import {CALL_API} from 'redux-api-middleware';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function clickTab(tabName){
	return {
		type: keys.wantListTabClicked.clicked,
		payload: tabName
	}
}

export function getWantList(wantListStatusId){
	return function getWantListThunk(dispatch, getState){
		return dispatch({
			[CALL_API]: {
				endpoint: keys.endpoint + 'wantlist?wantStatusId=' + wantListStatusId,
				method: 'GET',
				headers: jsonHeaders,
				types: [
					keys.wantList.getting,
					keys.wantList.success,
					keys.wantList.failure
				]
			}
		});
	}
}

export function getWantListStatuses(){
	return function getWantListStatusesThunk(dispatch, getState){
		return dispatch({
			[CALL_API]: {
				endpoint: keys.endpoint + 'wantliststatus',
				method: 'GET',
				headers: jsonHeaders,
				types: [
					keys.wantListStatus.getting,
					keys.wantListStatus.success,
					keys.wantListStatus.failure
				]
			}
		});
	}
}

export function startChangeWantStatus(cardKey){
	return {
		type: keys.startChangeStatus,
		payload: cardKey
	};
}

export function cancelChangeWantStatus(){
	return {
		type: keys.cancelChangeWantStatus
	};
}

export function saveStatusChange(item){
	return function saveStatusChangeThunk(dispatch, getState){
		return dispatch({
			[CALL_API]: {
				endpoint: keys.endpoint + 'wantlist',
				method: 'PUT',
				body: JSON.stringify(item),
				headers: jsonHeaders,
				types: [
					keys.wantListSave.getting,
					keys.wantListSave.success,
					keys.wantListSave.failure
				]
			}
		});
	}
}
