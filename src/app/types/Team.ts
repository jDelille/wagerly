export type Team = {
	id: string;
	location: string;
	name: string;
	abbreviation: string;
	displayName: string;
	color: string;
	alternateColor: string;
	logos: [
		{
			href: string;
			alt: string;
		}
	];
};
