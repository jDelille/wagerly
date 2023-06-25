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
		geoBroadcasts: [
			{
				media: {
					shortName: string;
				};
			}
		];
		status: {
			type: {
				shortDetail: string;
				detail: string;
				state: string;
			};
		};
		odds: [
			{ details: string },
			{
				awayTeamOdds: {
					winPercentage: number;
					spreadOdds: number;
				};
				homeTeamOdds: {
					winPercentage: number;
					spreadOdds: number;
				};
			}
		];
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
					id: string;
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
					name: string;
					logo: string;
					color: string;
					alternateColor: string;
					id: string;
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
