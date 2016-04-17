import {combineReducers} from 'redux-immutablejs';

import wantList from './wantList';
import tab from './tab';
import comicVine from './comicVine';

export default combineReducers({
	wantList,
	tab,
	comicVine
});
