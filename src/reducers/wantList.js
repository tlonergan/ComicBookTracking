import keys from '../core/keys';
import initialState from '../store/initialStore';
import _ from 'lodash';

export default function wantListReducer(state = initialState.get('wantList'), action){
	switch (action.type){
		case keys.wantList.getting:
			return gettingWantList(state, action);
		case keys.wantList.success:
			return successWantList(state, action);
		case keys.wantListTabClicked.clicked:
			return wantListTabClicked(state, action);
		case keys.startChangeStatus:
			return startChangeStatus(state, action);
		case keys.cancelChangeWantStatus:
			return cancelChangeWantStatus(state, action);
		case keys.wantListStatus.getting:
			return gettingWantListStatus(state, action);
		case keys.wantListStatus.success:
			return successWantListStatus(state, action);
		case keys.wantListSave.getting:
			return gettingWantListSave(state, action);
		case keys.wantListSave.success:
			return successWantListSave(state, action);
		case keys.wantList.failure:
		case keys.wantListStatus.failure:
		case keys.wantListSave.failure:
			return failure(state, action);
		default:
			return state;
	}
}

function failure(state, action){
	return state;
}

function gettingWantList(state, action){
	let newState = state.set('isRetrieving', true);
	return newState;
}

function successWantList(state, action){
	var wantLists = action.payload;

	wantLists = _.sortBy(wantLists, function(item){return item.Book.Series.Name;});
	let newState = state.set('lists', wantLists);
	newState = newState.set('isRetrieving', false);
	return newState;
}

function wantListTabClicked(state, action){
	let newState = state.set('selectedTab', action.payload);
	return newState;
}

function startChangeStatus(state, action){
	let newState = state.set('changingStateKey', action.payload);
	return newState;
}

function cancelChangeWantStatus(state, action){
	let newState = state.set('changingStateKey', null);
	return newState;
}

function gettingWantListStatus(state, action){
	return state;
}

function successWantListStatus(state, action){
	let newState = state.set('statuses', action.payload);
	return newState;
}

function gettingWantListSave(state, action){
	console.log(action);
	console.log(state);
	return state;
}

function successWantListSave(state,action){

	return state;
}