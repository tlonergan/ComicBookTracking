import keys from '../core/keys';
import initialState from '../store/initialStore';

export default function locationReducer(state = initialState.get('location'), action){
  switch(action.type){
    case keys.location.get.getting:
      return gettingGetLocation(state, action);
    case keys.location.get.success:
      return successGetLocation(state, action);
    default:
      return state;
  }
}

function gettingGetLocation(state, action){
  let newState = state.set('isFetching', true);
  return newState;
}

function successGetLocation(state, action){
  let newState = state.set('list', action.payload);
  newState = newState.set('isFetching', false);
  return newState;
}
