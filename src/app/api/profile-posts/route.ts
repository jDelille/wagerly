import { z } from 'zod';

import prisma from '../../libs/prismadb';

export async function GET(req: Request) {
	const url = new URL(req.url);

	try {
		const { limit, page, user } = z
			.object({
				limit: z.string(),
				page: z.string(),
				user: z.string(),
			})
			.parse({
				limit: url.searchParams.get('limit'),
				page: url.searchParams.get('page'),
				user: url.searchParams.get('user'),
			});
		const posts = await prisma.post.findMany({
			where: {
				user: {
					username: user,
				},
			},
			take: parseInt(limit),
			skip: (parseInt(page) - 1) * parseInt(limit),
			orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
			include: {
				Bet: true,
				user: true,
				comments: true,
				Poll: true,
				UserBet: true,
				Parlay: {
					include: {
						bets: true,
					},
				},
			},
		});

		return new Response(JSON.stringify(posts));
	} catch (error) {
		return new Response(`Could not fetch user posts`, { status: 500 });
	}
}
