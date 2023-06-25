export async function getGames(league: string, date: string) {
	try {
		const isSoccer = league === 'soccer';
		// const res = await fetch(
		// 	`https://api.foxsports.com/bifrost/v1/${league}/scoreboard/segment/${
		// 		isSoccer ? 'c0d' : ''
		// 	}${date}?${
		// 		isSoccer ? `groupId=0&` : ''
		// 	}apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
		// );

		const res = await fetch(
			`https://api.foxsports.com/bifrost/v1/mlb/scoreboard/segment/${date}?apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch matches');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// export async function getMatch(
// 	matchId: string,
// 	league: string,
// 	substringNum: number
// ) {
// 	const id = matchId.substring(substringNum);

// 	try {
// 		const res = await fetch(
// 			`https://api.foxsports.com/bifrost/v1/${league}/event/${id}/data?apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
// 		);

// 		if (!res.ok) {
// 			throw new Error('Failed to match data');
// 		}

// 		const data = await res.json();
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// }

//https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${game.id}/competitions/${game.id}/odds

export async function getOdds(matchId: string, league: string, sport: string) {
	try {
		const res = await fetch(
			`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${matchId}/competitions/${matchId}/odds`
		);

		if (!res.ok) {
			throw new Error('Failed to match data');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getTeam(id: string, league: string, sport?: string) {
	try {
		const res = await fetch(
			`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/teams/${id}?lang=en&region=us`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch team data.');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// export async function getOdds(
// 	matchId: string,
// 	league: string,
// 	substringNum: number,
// 	sport?: string
// ) {
// 	const id = matchId.substring(substringNum);

// 	try {
// 		const res = await fetch(
// 			`https://api.foxsports.com/bifrost/v1/${league}/event/${id}/odds?api-version=1.1&apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
// 		);

// 		if (!res.ok) {
// 			throw new Error('Failed to match odds');
// 		}

// 		const data = await res.json();
// 		return data;
// 	} catch (error) {
// 		console.log(error);
// 		throw error;
// 	}
// }

export async function getTopGames(sport: string, league: string) {
	try {
		const res = await fetch(
			`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch matches');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// match info

export async function getMatchInfo(sport: string, league: string, id: string) {
	try {
		const res = await fetch(
			`https://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${id}`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch match info');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// espn scores api

export async function getScores(sport: string, league: string) {
	try {
		const res = await fetch(
			`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/scoreboard`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch matches');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

// match summary api

//https://site.api.espn.com/apis/site/v2/sports/baseball/mlb/summary?event=401472179

export async function getMatchSummary(
	sport: string,
	league: string,
	id: string
) {
	try {
		const res = await fetch(
			`https://site.api.espn.com/apis/site/v2/sports/${sport}/${league}/summary?event=${id}`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch match summary');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
