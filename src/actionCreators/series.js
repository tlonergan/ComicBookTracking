import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';
import {toJS} from 'immutable';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function getSeriesByName(seriesName){
  return function getSeriesByNameThunk(dispatch, getState){

    console.log('In getSeriesByName')
    return dispatch({
      [CALL_API]: {
        endpoint: keys.endpoint + 'series?name=' + escape(seriesName),
        method: 'GET',
        headers: jsonHeaders,
        types: [
          keys.getSeries.getting,
          keys.getSeries.success,
          keys.getSeries.failure
        ]
      }
    });
  }
}

export function createSeries(series){
  return function createSeriesThunk(dispatch, getState){
    return dispatch({
      [CALL_API]: {
        endpoint: keys.endpoint + 'series',
        method: 'POST',
        headers: jsonHeaders,
        body: JSON.stringify(series),
        types: [
          keys.addSeries.getting,
          keys.addSeries.success,
          keys.addSeries.failure
        ]
      }
    });
  }
}
