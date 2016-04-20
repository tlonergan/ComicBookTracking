import keys from '../core/keys';
import initialState from '../store/initialStore';

export default function comicVineReducer(state = initialState.get('comicVine'), action){
  console.log('in reducer file')
  switch (action.type) {
    case keys.comicVineGet.getting:
      return gettingComicVineBooks(state, action);
    case keys.comicVineGet.success:
      return successComicVineBooks(state, action);
    case keys.comicVine.showPublisher:
      return showPublisher(state, action);
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
  console.log('in reducer')
  let newState = state.set('shownPublisher', action.payload);
  return newState;
}
