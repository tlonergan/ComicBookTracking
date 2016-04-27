import keys from '../core/keys';
import initialState from '../store/initialStore';

export default function comicVineReducer(state = initialState.get('comicVine'), action){
  switch (action.type) {
    case keys.comicVineGet.getting:
      return gettingComicVineBooks(state, action);
    case keys.comicVineGet.success:
      return successComicVineBooks(state, action);
    case keys.comicVine.showPublisher:
      return showPublisher(state, action);
    case keys.comicVine.setReleaseDay:
      return setReleaseDay(state, action);
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
    default:
      return state;
  }
}

function gettingComicVineBooks(state, action){
  let newState = state.set('isRetrieving', true);
  return newState;
}

function successComicVineBooks(state, action){
  let newState = state.set('comicVineBooks', action.payload);
  newState = newState.set('isRetrieving', false);
  return newState;
}

function showPublisher(state, action){
  let newState = state.set('shownPublisher', action.payload);
  return newState;
}

function setReleaseDay(state, action){
  let newState = state.set('releaseDay', action.payload);
  return newState;
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
  console.log('In successful Get Series Reducer');
  console.log(action.payload);
  let newState = state.set('isRetrieving', false);
  newState = newState.set('currentSeries', action.payload);
  return newState;
}

function failureSeriesGet(state, action){
  let newState = state.set('isRetrieving', false);
  return newState;
}
