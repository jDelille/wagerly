import prisma from '@/app/libs/prismadb';
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

		const formattedPosts = posts
			.filter((post) => post.userBetId !== null) // Filter out posts without userBetId
			.map((post) => ({
				...post,
				createdAt: post.createdAt.toISOString(),
				updatedAt: post.updatedAt.toISOString(),
				user: {
					...post.user,
					createdAt: post.user.createdAt.toISOString(),
					updatedAt: post.user.updatedAt.toISOString(),
				},
				comments: post.comments.map((comment) => ({
					...comment,
					createdAt: comment.createdAt.toISOString(),
					updatedAt: comment.updatedAt.toISOString(),
				})),
			}));

		return new Response(JSON.stringify(formattedPosts));
	} catch (error) {
		return new Response('Could not fetch posts', { status: 500 });
	}
}
