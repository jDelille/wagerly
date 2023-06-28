import getCurrentUser from '@/app/actions/getCurrentUser';
import {
	checkAwayScore,
	checkHomeScore,
	checkStatus,
} from '@/app/api/sportsbookData';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
	betId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const { betId } = params;

	const userBet = await prisma.userBet.findUnique({
		where: {
			id: betId,
		},
	});

	if (!userBet) {
		throw new Error('UserBet not found');
	}

	let status = false;
	const outcome = userBet.outcome;
	const sport = userBet.sport;
	const league = userBet.league;
	const gameId = userBet.description;

	try {
		const data = await checkStatus('baseball', 'mlb', gameId);
		status = data.type.completed;
	} catch (error: any) {
		throw new Error('Failed to fetch game status');
	}

	if (!status) {
		return;
	}

	if (status) {
		const matchId = userBet.description;
		const homeId = userBet.homeId;
		const awayId = userBet.awayId;

		let homeScore = 0;
		let awayScore = 0;

		try {
			const homeData = await checkHomeScore(
				'baseball',
				'mlb',
				matchId,
				homeId as string
			);
			console.log(homeData);
			homeScore = homeData.value;
			const awayData = await checkAwayScore(
				'baseball',
				'mlb',
				matchId,
				awayId as string
			);
			awayScore = awayData.value;
		} catch (error: any) {
			throw new Error('Failed to fetch home team and/or away team data');
		}

		let result = 'null';

		let betValue = Number(userBet.bet);

		const isHome = userBet.location === 'home';
		const isAway = userBet.location === 'away';
		const isSpread = userBet.type === 'Spread';
		const isTotal = userBet.type === 'Total';
		const isMoneyline = userBet.type === 'To win';

		// spread

		if (isSpread && isHome) {
			let homeScoreWithSpread = homeScore + betValue;

			if (homeScoreWithSpread > awayScore) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		if (isSpread && isAway) {
			let awayScoreWithSpread = awayScore + betValue;

			if (awayScoreWithSpread > homeScore) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		// total

		if (isTotal && isHome) {
			let total = homeScore + awayScore;
			const isOver = userBet.bet[0] === 'o';
			if (isOver && total > betValue) {
				result = 'win';
			} else if (!isOver && total < betValue) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		if (isTotal && isAway) {
			let total = homeScore + awayScore;
			const isOver = userBet.bet[0] === 'o';
			if (isOver && total > betValue) {
				result = 'win';
			} else if (!isOver && total < betValue) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		// moneyline

		if (isMoneyline && isHome) {
			if (homeScore > awayScore) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		if (isMoneyline && isAway) {
			if (awayScore > homeScore) {
				result = 'win';
			} else {
				result = 'loss';
			}
		}

		const updatedBet = await prisma.userBet.update({
			where: {
				id: betId,
			},
			data: {
				outcome: result,
			},
		});
		return NextResponse.json({ updatedBet });
	}
}
