import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';
import {toJS} from 'immutable';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';
import {callGetWebservice, callPutWebservice} from './base';

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

export function getBooks(filterString, locationId){
  return function getBooksThunk(dispatch, getState){
    let serviceParameters = '?';
    if(filterString && filterString !== ''){
      serviceParameters = serviceParameters + 'filterString=' + filterString;
    }

    if(locationId && (locationId !== '' || locationId !== 0)){
      if(serviceParameters !== '?'){
        serviceParameters = serviceParameters + '&';
      }

      serviceParameters = serviceParameters + 'locationId=' + locationId;
    }

    var serviceURI = 'book';
    if(serviceParameters !== '?'){
      serviceURI = serviceURI + serviceParameters;
    }

    return dispatch(callGetWebservice(dispatch, keys.book.get, serviceURI));
  };
}

export function setSearchFilter(searchFilter){
  return function setSearchFilterThunk(dispatch, state){
    return dispatch({
      type: keys.book.setSearchFilter,
      payload: searchFilter
    });
  };
}

export function updateBook(book){
  return function updateBookThunk(dispatch, state){
    return dispatch(
      callPutWebservice(dispatch, keys.book.put, 'book', book)
    );
  };
}
