import { makeAutoObservable } from 'mobx';

class BetSlipStore {
	date: string = '';
	matchup: string = '';
	selectedTeamLogo: string = '';
	selectedTeamName: string = '';
	selectedBet: string = '';
	selectedOdds: string = '';
	selectedOddsDisplay: string = '';
	oddsDisplay: string = '';
	payoutMultiplier: number = 0;
	type: string = '';

	constructor() {
		makeAutoObservable(this);
	}

	setDate(date: string) {
		this.date = date;
	}

	setMatchup(matchup: string) {
		this.matchup = matchup;
	}

	setSelectedTeamLogo(selectedTeamLogo: string) {
		this.selectedTeamLogo = selectedTeamLogo;
	}

	setSelectedTeamName(selectedTeamName: string) {
		this.selectedTeamName = selectedTeamName;
	}

	setSelectedBet(selectedBet: string) {
		this.selectedBet = selectedBet;
	}

	setSelectedOdds(selectedOdds: string) {
		this.selectedOdds = selectedOdds;
	}

	setSelectedOddsDisplay(selectedOddsDisplay: string) {
		this.selectedOddsDisplay = selectedOddsDisplay;
	}

	setOddsDisplay(oddsDisplay: string) {
		this.oddsDisplay = oddsDisplay;
	}

	setPayoutMultiplier(payoutMultiplier: number) {
		this.payoutMultiplier = payoutMultiplier;
	}

	setType(type: string) {
		this.type = type;
	}
}

const betSlipStore = new BetSlipStore();

export default betSlipStore;
