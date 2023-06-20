import prisma from '@/app/libs/prismadb';

interface IParams {
	username?: string;
}
export default async function getFollowersCount(params: IParams) {
	try {
		const { username } = params;

		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!user) {
			return null;
		}

		const followersCount = await prisma.user.count({
			where: {
				followingIds: {
					has: user.id,
				},
			},
		});

		return followersCount;
	} catch (error: any) {
		throw new Error(error);
	}
}
