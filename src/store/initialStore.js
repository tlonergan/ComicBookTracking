import {fromJS} from 'immutable';

export default fromJS({
	wantList: {
		isRetrieving: false,
		errorMessage: null,
		lists: null,
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
		shownPublisher: null,
		releaseDay: null
	}
});
