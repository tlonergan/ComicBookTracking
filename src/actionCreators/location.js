import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';
import {toJS} from 'immutable';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function getLocations(){
  return function getLocationsThunk(dispatch, getState){
    		return dispatch({
    			[CALL_API]: {
    				endpoint: keys.endpoint + 'location',
    				method: 'POST',
    				headers: jsonHeaders,
    				types: [
    					keys.location.get.getting,
    					keys.location.get.success,
    					keys.location.get.failure
    				]
    			}
    		});
  }
}
