import keys from '../core/keys';
import initialState from '../store/initialStore';

export default function baseReducer(state = initialState.get("base"), action){
  switch(action.type){
    case keys.generalFailureKey:
      return fail(state, action);
    default:
      state = state.set("isFailure", false);
      return state;
  }
}

function fail(state, action){
  let newState = state.set("isFailure", true);
  return newState;
}
