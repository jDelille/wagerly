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

export async function checkStatus(sport: string, league: string, id: string) {
	try {
		const res = await fetch(
			`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${id}/competitions/${id}/status?lang=en&region=us`
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

// http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${gameId}/competitions/${gameId}/competitors/${homeId}/score?lang=en&region=us

export async function checkHomeScore(
	sport: string,
	league: string,
	id: string,
	homeId: string
) {
	try {
		const res = await fetch(
			`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${id}/competitions/${id}/competitors/${homeId}/scores/2?lang=en&region=us`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch home score');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function checkAwayScore(
	sport: string,
	league: string,
	id: string,
	awayId: string
) {
	try {
		const res = await fetch(
			`http://sports.core.api.espn.com/v2/sports/${sport}/leagues/${league}/events/${id}/competitions/${id}/competitors/${awayId}/scores/2?lang=en&region=us`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch away score');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
