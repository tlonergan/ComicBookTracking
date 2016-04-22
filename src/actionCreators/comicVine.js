import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function getComicVineBooks(releaseDay, weekAdjustment){
	return function getWantListThunk(dispatch, getState){
		if(!releaseDay){
			releaseDay = moment();
		}

		if(!weekAdjustment){
			weekAdjustment = 0;
		}

		let dateAdjustment = 3 - 7;
		if(releaseDay.day() == 3){
			dateAdjustment = 3;
		}

		releaseDay = releaseDay.day(dateAdjustment);
		releaseDay = releaseDay.add(weekAdjustment, 'w');

		dispatch(setCurrentReleaseDay(releaseDay));

		return dispatch({
			[CALL_API]: {
				endpoint: keys.endpoint + 'comicVine?releaseDay=' + releaseDay.format(),
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

function setCurrentReleaseDay(releaseDay){
	return {
		type: keys.comicVine.setReleaseDay,
		payload: releaseDay
	}
}

export function showPublisher(publisherKey){
		return {
			type: keys.comicVine.showPublisher,
			payload: publisherKey
		};
}
