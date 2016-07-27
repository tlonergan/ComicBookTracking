import {combineReducers} from 'redux-immutablejs';

import wantList from './wantList';
import tab from './tab';
import comicVine from './comicVine';
import series from './series';
import book from './book';
import location from './location';
import base from './base';

export default combineReducers({
	wantList,
	tab,
	comicVine,
	series,
	book,
	location,
	base
});
