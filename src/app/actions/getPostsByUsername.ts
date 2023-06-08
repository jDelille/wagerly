import prisma from '@/app/libs/prismadb';

interface IParams {
	username?: string;
}
export default async function getPostsByUsername(params: IParams) {
	try {
		const { username } = params;
		const posts = await prisma.post.findMany({
			where: {
				user: {
					username: username,
				},
				NOT: {
					groupId: {
						not: null,
					},
				},
			},
			orderBy: [{ isPinned: 'desc' }, { createdAt: 'desc' }],
			include: {
				Bet: true,
				user: true,
				comments: true,
				Poll: true,
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
