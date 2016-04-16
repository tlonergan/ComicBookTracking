import {CALL_API} from 'redux-api-middleware';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function getComicVineBooks(){
	return function getWantListThunk(dispatch, getState){
		return dispatch({
			[CALL_API]: {
				endpoint: keys.endpoint + 'comicVine',
				method: 'GET',
				headers: jsonHeaders,
				types: [
					keys.comicVineGet.getting,
					keys.comicVineGet.success,
					keys.comicVineGet.failure
				]
			}
		});
	}
}
