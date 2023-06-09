export type Team = {
	abbreviation: string;
	displayName: string;
	id: string;
	location: string;
	logos: [
		{
			href: string;
		}
	];
	name: string;
	shortDisplayName: string;
	slug: string;
	standingSummary: string;
	record: {
		items: [
			{
				description: string;
				summary: string;
				type: string;
				stats: [
					{
						name: string;
						value: string;
					}
				];
			}
		];
	};
};
