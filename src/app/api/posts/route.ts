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
		const posts = await prisma.post.findMany({
			take: parseInt(limit),
			skip: (parseInt(page) - 1) * parseInt(limit),
			orderBy: {
				createdAt: 'desc',
			},
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
		return new Response('Could not fetch posts', { status: 500 });
	}
}
