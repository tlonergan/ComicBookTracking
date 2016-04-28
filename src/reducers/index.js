import {combineReducers} from 'redux-immutablejs';

import wantList from './wantList';
import tab from './tab';
import comicVine from './comicVine';
import series from './series';

export default combineReducers({
	wantList,
	tab,
	comicVine,
	series
});
