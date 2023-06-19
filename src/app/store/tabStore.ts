import { makeAutoObservable } from 'mobx';

class TabStore {
	tab: string = 'Posts';

	constructor() {
		makeAutoObservable(this);
	}

	setTab(tab: string) {
		this.tab = tab;
	}
}

const tabStore = new TabStore();

export default tabStore;
