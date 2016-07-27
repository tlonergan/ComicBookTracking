import {CALL_API} from 'redux-api-middleware';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function callGetWebservice(dispatch, serviceKeys, serviceNameAndParameters){
  return dispatch({
    [CALL_API]: {
      endpoint: keys.endpoint + serviceNameAndParameters,
      method: 'GET',
      headers: jsonHeaders,
      types: [
        serviceKeys.getting,
        serviceKeys.success,
        keys.generalFailureKey
      ]
    }
  });
}

export function callPutWebservice(dispatch, serviceKeys, serviceName, body){
  return dispatch({
    [CALL_API]: {
      endpoint: keys.endpoint + serviceName,
      method: 'PUT',
      headers: jsonHeaders,
      body: JSON.stringify(body),
      types: [
        serviceKeys.getting,
        serviceKeys.success,
        keys.generalFailureKey
      ]
    }
  });
}
