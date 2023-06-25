export type Match = {
	id: string;
	league: 'MLB';
	statusLine: string;
	eventTime: string;
	eventStatus: number;
	liveStartTime: string;
	tvStation: string;
	oddsLine: string;
	overUnderLine: string;
	lowerTeam: {
		id: string;
		imageAltText: string;
		isLoser: boolean;
		logoUrl: string;
		longName: string;
		name: string;
		record: string;
		score: number;
	};
	upperTeam: {
		id: string;
		imageAltText: string;
		isLoser: boolean;
		logoUrl: string;
		longName: string;
		name: string;
		record: string;
		score: number;
	};
};

export type Game = {
	homeTeam: string;
	awayTeam: string;
	homeScore: number;
	awayScore: number;
	name: string;
	shortName: string;
	id: string;
	date: string;
	midsizeName: string;
	status: {
		type: {
			completed: boolean;
			detail: string;
			shortDetail: string;
			state: string;
		};
	};
	season: {
		slug: string;
	};

	competitions: {
		id: string;

		status: {
			type: {
				shortDetail: string;
				detail: string;
			};
		};
		competitors: [
			{
				id: string;
				name: string;
				score: string;
				homeAway: string;
				winner: boolean;
				records: [
					{
						summary: string;
					}
				];
				team: {
					abbreviation: string;
					displayName: string;
					shortDisplayName: string;
					name: string;
					logo: string;
					color: string;
					alternateColor: string;
					id: number;
				};
			},
			{
				id: string;
				name: string;
				score: string;
				homeAway: string;
				winner: boolean;
				athlete?: {
					fullName: string;
					flag: {
						href: string;
					};
				};
				records: [
					{
						summary: string;
					}
				];
				team: {
					abbreviation: string;
					displayName: string;
					shortDisplayName: string;
					logo: string;
					color: string;
					alternateColor: string;
					id: number;
				};
			}
		];
		venue: {
			fullName: string;
			address: {
				city: string;
				state: string;
				country: string;
			};
		};
	}[];
};

export type MatchHeader = {
	sportLogoUrl: string;
	statusLine: string;
	venueLocation: string;
	venueName: string;
	eventTime: string;
	leftTeam: {
		imageAltText: string;
		logoUrl: string;
		name: string;
		longName: string;
		record: string;
		score: number;
		entityLink: {
			title: string;
		};
	};
	rightTeam: {
		imageAltText: string;
		logoUrl: string;
		name: string;
		longName: string;
		record: string;
		score: number;
		entityLink: {
			title: string;
		};
	};
};

export type MatchOdds = {
	title: string;
	eventTime: string;
	eventStatus: number;
	betSection: {
		name: string;
	};
	odds: {
		columnHeaders: string[];
		rows: {
			imageAltText: string;
			imageUrl: string;
			fullText: string;
			values: [
				{
					id: string;
					odds: string;
					success: boolean;
				},
				{
					id: string;
					odds: string;
					success: boolean;
				},
				{
					id: string;
					odds: string;
					success: boolean;
				}
			];
		}[];
	};
};

export type OddsType = {
	details: string;
	awayTeamOdds: {
		favorite: boolean;
		moneyLine: number;
		spreadOdds: number;
	};
	homeTeamOdds: {
		favorite: boolean;
		moneyLine: number;
		spreadOdds: number;
	};
	moneylineWinner: boolean;
	overOdds: number;
	underOdds: number;
	overUnder: number;
	spread: number;
	spreadWinner: number;
};

export type Chance = {
	title: string;
	description: string;
	lines: [
		{
			name: string;
			name2: string;
			color: string;
			alternateColor: string;
			alternateColor2: string;
			color2: string;
			stat1Value: string;
			stat1Subtext: string;
			stat2Value: string;
			stat2Subtext: string;
		}
	];
};

export type Breakdown = {
	description: string;
	title: string;
	items: [
		{
			title: string;
			leftColor: string;
			leftDisplay: string;
			leftName: string;
			leftValue: number;
			rightColor: string;
			rightDisplay: string;
			rightName: string;
			rightValue: number;
		}
	];
};
