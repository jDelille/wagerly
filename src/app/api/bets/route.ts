import prisma from '../../libs/prismadb';
import { z } from 'zod';

export async function GET(req: Request) {
	const url = new URL(req.url);

	try {
		const { limit, page } = z
			.object({
				limit: z.string(),
				page: z.string(),
			})
			.parse({
				limit: url.searchParams.get('limit'),
				page: url.searchParams.get('page'),
			});
		const bets = await prisma.post.findMany({
			where: {
				userBetId: { not: null },
			},
			take: parseInt(limit),
			skip: (parseInt(page) - 1) * parseInt(limit),
			orderBy: {
				createdAt: 'desc',
			},
			include: {
				Bet: true,
				UserBet: true,
				Parlay: {
					include: {
						bets: true,
					},
				},
				user: true,
				comments: true,
			},
		});

		return new Response(JSON.stringify(bets));
	} catch (error) {
		return new Response('Could not fetch bets', { status: 500 });
	}
}
