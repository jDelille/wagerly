import { makeAutoObservable } from 'mobx';

class SearchStore {
	search: string = '';

	constructor() {
		makeAutoObservable(this);
	}

	setSearch(search: string) {
		this.search = search;
	}
}

const searchStore = new SearchStore();

export default searchStore;
