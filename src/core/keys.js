const keys = {
	// endpoint: 'http://comicbook-env.us-west-2.elasticbeanstalk.com/api/',
	endpoint: 'http://localhost:58010/api/',
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
	startChangeStatus: "startChangeStatus",
	cancelChangeWantStatus: "cancelChangeWantStatus"
}

export default keys;