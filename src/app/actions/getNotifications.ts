import prisma from '@/app/libs/prismadb';

interface IParams {
	username?: string;
}
export default async function getNotificationByUserId(params: IParams) {
	try {
		const { username } = params;

		if (!username) {
			throw new Error('User is not authenticated');
		}

		const user = await prisma.user.findUnique({
			where: {
				username: username,
			},
		});

		if (!user) {
			throw new Error('User is not authenticated');
		}

		const notification = await prisma.notification.findMany({
			where: {
				userId: user?.id,
			},
		});

		await prisma.user.update({
			where: {
				username: username,
			},
			data: {
				hasNotification: false,
			},
		});

		return notification;
	} catch (error: any) {
		throw new Error(error);
	}
}
