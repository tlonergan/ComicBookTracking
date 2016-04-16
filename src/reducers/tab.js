import keys from '../core/keys';
import initialState from '../store/initialStore';
import _ from 'lodash';

export default function tabReducer(state = initialState.get('wantList'), action){
  switch(action.type){
    case keys.wantListTabClicked.clicked:
      return wantListTabClicked(state, action);
    default:
      return state;
  }
}

function wantListTabClicked(state, action){
	let newState = state.set('selectedTab', action.payload);
	return newState;
}
