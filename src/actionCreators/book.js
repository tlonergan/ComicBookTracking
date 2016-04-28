import {CALL_API} from 'redux-api-middleware';
import moment from 'moment';
import {toJS} from 'immutable';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

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
