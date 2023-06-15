import prisma from '@/app/libs/prismadb';
import getCurrentUser from './getCurrentUser';

interface IParams {
	username?: string;
}

export default async function getBookmarks(params: IParams) {
	try {
		const { username } = params;

		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!user) {
			throw new Error('User not found');
		}

		const bookmarkedPostIds = user.bookmarks.map((bookmark) => bookmark);

		const posts = await prisma.post.findMany({
			where: {
				id: {
					in: bookmarkedPostIds, // Filter posts by the bookmarked postIds
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
