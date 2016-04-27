const keys = {
	// endpoint: 'http://comicbook-env.us-west-2.elasticbeanstalk.com/api/',
	endpoint: 'http://localhost:58010/api/',
	// endpoint: 'http://comicbookservices-test.us-west-2.elasticbeanstalk.com/api/',
	wantList: {
		getting: "GettingWantList",
		success: "SuccessWantList",
		failure: "failureWantList"
	},
	wantListSave: {
		getting: "GettingWantListSave",
		success: "SuccessWantListSave",
		failure: "failureWantListSave"
	},
	wantListStatus:{
		getting: "GettingWantListStatus",
		success: "SuccessWantListStatus",
		failure: "failureWantListStatus"
	},
	wantListTabClicked: {
		clicked: "WantListTabClicked"
	},
	wantListStatusIds:{
		wanted: 1,
		recieved: 2,
		backIssue: 3,
		heldAtStore: 4,
		wantedHold: 5
	},
	comicVineTabKeys:{
		added: 'added',
		attached: 'attached',
		unattached: 'unattached'
	},
	startChangeStatus: "startChangeStatus",
	cancelChangeWantStatus: "cancelChangeWantStatus",
	comicVineGet:{
		getting: 'gettingComicVine',
		success: "successComicVine",
		failure: 'failedComicVine'
	},
	comicVine:{
		showPublisher: 'showPublisher',
		setReleaseDay: 'setReleaseDay'
	},
	addSeries:{
		getting: 'addSeriesGet',
		success: 'addSeriesSuccess',
		failure: 'addSeriesFailure'
	},
	getSeries:{
		getting: 'getSeriesGet',
		success: 'getSeriesSuccess',
		failure: 'getSeriesFailure'
	},
	comicVineAttachSeries:{
		getting: 'comicVineAttachSeriesGet',
		success: 'comicVineAttachSeriesSuccess',
		failure: 'comicVineAttachSeriesFailure'
	}
}

export default keys;
