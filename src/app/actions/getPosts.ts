import { INFINITE_SCROLL_PAGINATION_RESULTS } from '@/config';
import prisma from '../libs/prismadb';

export default async function getPosts() {
	try {
		const posts = await prisma.post.findMany({
			where: {
				NOT: {
					groupId: {
						not: null,
					},
				},
			},
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

		const formattedPosts = posts.map((post) => ({
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

		return formattedPosts;
	} catch (error: any) {
		throw new Error(error);
	}
}
