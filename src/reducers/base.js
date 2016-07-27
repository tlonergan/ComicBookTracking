import keys from '../core/keys';
import initialState from '../store/initialStore';

export default function baseReducer(state = initialState, action){
  switch(action.type){
    case keys.generalFailureKey:
      return fail(state, action);
    default:
      return state;
  }
}

function fail(state, action){
  console.log('FAILURE');
  console.log(action);
  return state;
}
