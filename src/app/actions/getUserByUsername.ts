import prisma from '../libs/prismadb';

interface IParams {
	username?: string;
}

export default async function getUserByUsername(params: IParams) {
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

		return {
			...user,
			createdAt: user.createdAt.toISOString(),
			updatedAt: user.updatedAt.toISOString(),
			emailVerified: user.emailVerified?.toISOString() || null,
		};
	} catch (error: any) {
		throw new Error(error);
	}
}
