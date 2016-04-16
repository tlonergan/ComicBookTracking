import keys from '../core/keys';
import initialState from '../store/initialStore';

export default comicVineReducer(state = initialState.get('tab'), action){
  switch (action.type) {
    case keys.comicVineGet.getting:
      return gettingComicVineBooks(state, action);
    case keys.comicVineGet.success:
      return successComicVineBooks(state, action);
    default:
      return state;
  }
}

function gettingComicVineBooks(state, action){
  let newState = state.set('isRetrieving', true);
  return newState;
}

function successComicVineBooks(state, action){
  console.log(action.payload)

  let newState.set('comicVineBooks', action.payload);
  newState = newState.set('isRetrieving', false);
  return newState;
}
