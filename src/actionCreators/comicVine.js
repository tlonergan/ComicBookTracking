import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function getComicVineBooks(){
	return function getWantListThunk(dispatch, getState){
		let currentDate = moment();
		let dateAdjustment = 3 - 7;
		if(currentDate.day() == 3)
			dateAdjustment = 3;

		return dispatch({
			[CALL_API]: {
				endpoint: keys.endpoint + 'comicVine?releaseDay=' + currentDate.day(dateAdjustment).format(),
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
