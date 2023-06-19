import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import prisma from '@/app/libs/prismadb';

export default async function getBets() {
	try {
		const bets = await prisma.post.findMany({
			where: {
				userBetId: { not: null },
			},
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				UserBet: true,
				user: true,
				comments: true,
			},
			take: INFINITE_SCROLL_PAGINATION_RESULTS,
		});

		const formattedBets = bets.map((bet) => ({
			...bet,
			createdAt: bet.createdAt.toISOString(),
			updatedAt: bet.updatedAt.toISOString(),
			user: {
				...bet.user,
				createdAt: bet.user.createdAt.toISOString(),
				updatedAt: bet.user.updatedAt.toISOString(),
			},
			comments: bet.comments.map((comment) => ({
				...comment,
				createdAt: comment.createdAt.toISOString(),
				updatedAt: comment.updatedAt.toISOString(),
			})),
		}));

		return formattedBets;
	} catch (error) {
		throw new Error('Failed to fetch bets');
	}
}
