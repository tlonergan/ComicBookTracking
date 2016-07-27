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
		releaseDay: null,
		currentSeries: null
	},
	series:{
		isRetrieving: false,
		currentSeries: null,
		unattachedSeries: []
	},
	book:{
		filter:{
			filterString: '',
			locationId: null
		},
		bookList: [],
		isFetching: false,
		isSaving: false
	},
	location:{
		list:[],
		isFetching: false
	}
});
