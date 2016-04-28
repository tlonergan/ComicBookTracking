import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';
import {toJS} from 'immutable';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function getSeriesByName(seriesName){
  return function getSeriesByNameThunk(dispatch, getState){
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
  };
}

export function getAllUnattachedSeries(){
  return function getAllUnattachedSeriesThunk(dispatch, getState){
    return dispatch({
      [CALL_API]: {
        endpoint: keys.endpoint + 'series?isUnattached=' + escape(true),
        method: 'GET',
        headers: jsonHeaders,
        types: [
          keys.getSeries.getting,
          keys.getSeries.success,
          keys.getSeries.failure
        ]
      }
    });
  };
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
  };
}

export function getAllUnattachedSeries(){
  return function getAllUnattachedSeries(dispatch, getState){
    return dispatch({
      [CALL_API]: {
        endpoint: keys.endpoint + 'series?isUnattached=true',
        method: 'GET',
        headers: jsonHeaders,
        types: [
          keys.getUnattachedSeries.getting,
          keys.getUnattachedSeries.success,
          keys.getUnattachedSeries.failure
        ]
      }
    });
  };
}

export function setCurrentSeries(series){
  return function setCurrentSeriesThunk(dispatch, getState){
    return {
      type: keys.getSeries.success,
      payload: series
    };
  };
}

export function getSeries(seriesId){
  return function getSeriesThunk(dispatch, getState){
    return dispatch({
      [CALL_API]: {
        endpoint: keys.endpoint + 'series/' + seriesId,
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
