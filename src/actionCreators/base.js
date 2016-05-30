import {CALL_API} from 'redux-api-middleware';

import {jsonHeaders} from '../core/api';
import keys from '../core/keys';

export function callGetWebservice(serviceKeys, serviceNameAndParameters){
  return {
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
  };
}
