export type Match = {
	id: string;
	league: 'MLB';
	statusLine: string;
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

export type MatchHeader = {
	sportLogoUrl: string;
	statusLine: string;
	venueLocation: string;
	venueName: string;
	leftTeam: {
		imageAltText: string;
		logoUrl: string;
		name: string;
		longName: string;
		record: string;
		score: number;
	};
	rightTeam: {
		imageAltText: string;
		logoUrl: string;
		name: string;
		longName: string;
		record: string;
		score: number;
	};
};

export type MatchOdds = {
	title: string;
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

