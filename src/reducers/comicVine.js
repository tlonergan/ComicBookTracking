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
    case keys.comicVine.showSeriesSelector:
      return showSeriesSelector(state, action);
    case keys.comicVineAttachSeries.success:
      return successAttachSeries(state, action);
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

function showSeriesSelector(state, action){
  let newState = state.set('showSeriesSelector', action.payload);
  return newState;
}

function successAttachSeries(state, action){
  let newState = state.set('showSeriesSelector', null);
}
