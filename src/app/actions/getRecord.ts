import prisma from '@/app/libs/prismadb';

interface IParams {
	userId?: string;
}
export default async function getRecord(params: IParams) {
	try {
		const { userId } = params;

		// const user = await prisma.user.findUnique({
		// 	where: {
		// 		id: userId,
		// 	},
		// });

		// if (!user) {
		// 	return null;
		// }

		const bets = await prisma.userBet.count({
			where: {
				userId: userId,
				outcome: 'win',
			},
		});

		return bets;
	} catch (error: any) {
		throw new Error(error);
	}
}
