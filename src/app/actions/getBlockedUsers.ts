import prisma from '@/app/libs/prismadb';

interface IParams {
	blockedUserIds: string[];
}

export default async function getBlockedUsers(params: IParams) {
	const { blockedUserIds } = params;

	try {
		const blockedUsers = await prisma.user.findMany({
			where: {
				id: {
					in: blockedUserIds,
				},
			},
			orderBy: {
				createdAt: 'desc',
			},
		});

		return blockedUsers;
	} catch (error: any) {
		throw new Error(error);
	}
}
