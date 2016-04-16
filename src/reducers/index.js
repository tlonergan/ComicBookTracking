import {combineReducers} from 'redux-immutablejs';

import wantList from './wantList';
import tab from './tab';

export default combineReducers({
	wantList,
	tab
});
