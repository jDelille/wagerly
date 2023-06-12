export async function getGames(league: string, date: string) {
	try {
		const res = await fetch(
			`https://api.foxsports.com/bifrost/v1/${league}/scoreboard/segment/${date}?apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
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

export async function getMatch(matchId: string, league: string) {
	const id = matchId.substring(3);

	try {
		const res = await fetch(
			`https://api.foxsports.com/bifrost/v1/${league}/event/${id}/data?apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
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

export async function getOdds(matchId: string, league: string, sport?: string) {
	const id = matchId.substring(3);

	try {
		const res = await fetch(
			`https://api.foxsports.com/bifrost/v1/${league}/event/${id}/odds?api-version=1.1&apikey=jE7yBJVRNAwdDesMgTzTXUUSx1It41Fq`
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
