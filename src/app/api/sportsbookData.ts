export async function getGames(league?: string, sport?: string) {
	try {
		const res = await fetch(
			`https://api.foxsports.com/bifrost/v1/mlb/scoreboard/segment/20230611?apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
		);

		if (!res.ok) {
			throw new Error('Failed to fetch matches');
		}

		const data = await res.json();
		return data.sectionList[0].events;
	} catch (error) {
		console.log(error);
		throw error;
	}
}

export async function getMatch(
	matchId: string,
	league?: string,
	sport?: string
) {
	const id = matchId.substring(3);

	try {
		const res = await fetch(
			`https://api.foxsports.com/bifrost/v1/mlb/event/${id}/data?apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
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

export async function getOdds(
	matchId: string,
	league?: string,
	sport?: string
) {
	const id = matchId.substring(3);

	try {
		const res = await fetch(
			`https://api.foxsports.com/bifrost/v1/mlb/event/${id}/odds?api-version=1.1&apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
		);

		if (!res.ok) {
			throw new Error('Failed to match odds');
		}

		const data = await res.json();
		return data;
	} catch (error) {
		console.log(error);
		throw error;
	}
}
