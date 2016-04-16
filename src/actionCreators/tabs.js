import keys from '../core/keys';

export function clickTab(tabName){
	return {
		type: keys.wantListTabClicked.clicked,
		payload: tabName
	}
}
