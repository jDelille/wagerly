import { makeAutoObservable } from 'mobx';

class MatchStore {
	sport: string = 'baseball';
	league: string = 'mlb';
	homeTeamId: string = '';
	awayTeamId: string = '';

	constructor() {
		makeAutoObservable(this);
	}

	setSport(sport: string) {
		this.sport = sport;
	}

	setLeague(league: string) {
		if (league === 'mls') {
			return (this.league = 'soccer');
		} else {
			return (this.league = league);
		}
	}

	setHomeTeamId(id: string) {
		this.homeTeamId = id;
		localStorage.setItem('homeTeamId', id);
	}

	setAwayTeamId(id: string) {
		this.awayTeamId = id;
		localStorage.setItem('awayTeamId', id);
	}
}

const matchStore = new MatchStore();

export default matchStore;
