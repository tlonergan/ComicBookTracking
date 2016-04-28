import keys from '../core/keys';
import initialState from '../store/initialStore';
import _ from 'lodash';

export default function seriesReducer(state = initialState.get('series'), action){
	switch (action.type){
			case keys.addSeries.getting:
    		return startingSeriesAdd(state, action);
			case keys.addSeries.success:
    		return successfulSeriesAdd(state, action);
			case keys.addSeries.failure:
    		return failureSeriesAdd(state, action);
	    case keys.getSeries.getting:
	      return startingSeriesGet(state, action);
	    case keys.getSeries.success:
	      return successfulSeriesGet(state, action);
	    case keys.getSeries.failure:
	      return failureSeriesGet(state, action);
			case keys.getUnattachedSeries.success:
				return successGetUnattachedSeries(state, action);
			case keys.getUnattachedSeries.getting:
				return getUnattachedSeriesGetting(state, action);
			case keys.getUnattachedSeries.failure:
				return getUnattachedSeriesFailure(state, action);
		default:
			return state;
	}
}

function startingSeriesAdd(state, action){
  let newState = state.set('isRetrieving', true);
  return newState;
}

function successfulSeriesAdd(state, action){
  let newState = state.set('isRetrieving', false);
  return newState;
}

function failureSeriesAdd(state, action){
  let newState = state.set('isRetrieving', false);
  return newState;
}

function startingSeriesGet(state, action){
  let newState = state.set('isRetrieving', true);
  return newState;
}

function successfulSeriesGet(state, action){
  let newState = state.set('isRetrieving', false);
  newState = newState.set('currentSeries', action.payload);
  return newState;
}

function failureSeriesGet(state, action){
  let newState = state.set('isRetrieving', false);
  return newState;
}

function successGetUnattachedSeries(state, action){
	let newState = state.set('unattachedSeries', _.sortBy(action.payload, series => { return series.Name; }));
 	newState = newState.set('isRetrieving', false);
	return newState;
}

function getUnattachedSeriesGetting(state, action){
	let newState = state.set('isRetrieving', true);
	return newState;
}

function getUnattachedSeriesFailure(state, action){
	return state;
}
