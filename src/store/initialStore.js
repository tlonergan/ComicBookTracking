import {fromJS} from 'immutable';

export default fromJS({
	wantList: {
		isRetrieving: false,
		errorMessage: null,
		lists: null,
		selectedTab: 1,
		changingStateKey: null,
		statuses: [],
		saving: []
	},
	tab: {
		selectedTab: null
	},
	comicVine:{
		comicVineBooks: null,
		isRetrieving: false,
		shownPublisher: null
	}
});
