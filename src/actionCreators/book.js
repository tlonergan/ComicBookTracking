import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';
import {toJS} from 'immutable';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';
import {callGetWebservice} from './base';

export function addComicVineBook(book){
  return function addComicVineBookThunk(dispatch, getState){
  		return dispatch({
  			[CALL_API]: {
  				endpoint: keys.endpoint + 'comicvinebook',
  				method: 'POST',
  				headers: jsonHeaders,
          body: JSON.stringify(book),
  				types: [
  					keys.book.addComicVine.getting,
  					keys.book.addComicVine.success,
  					keys.book.addComicVine.failure
  				]
  			}
  		});
  };
}

export function getBook(filterString, locationId){
  return function getBookThunk(dispatch, getState){
    let serviceParameters = '?';
    if(filterString && filterString !== ''){
      serviceParameters = 'filterString=' + filterString;
    }

    if(locationId && (locationId !== '' || locationId !== 0)){
      if(serviceParameters !== '?'){
        serviceParameters = serviceParameters + '&';
      }

      serviceParameters = serviceParameters + 'locationId=' + locationId;
    }

    let serviceCall = callGetWebservice(keys.book.get, 'book' + serviceParameters);

    return dispatch({
      serviceCall
    });
  };
}

export function setSearchFilter(searchFilter){
  return function setSearchFilterThunk(dispatch, state){
    return dispatch({
      type: keys.book.setSearchFilter,
      payload: searchFilter
    });
  }
}
