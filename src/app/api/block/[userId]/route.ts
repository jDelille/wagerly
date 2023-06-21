import { NextResponse } from 'next/server';
import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';

interface IParams {
	userId: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { userId } = params;

	if (!userId || typeof userId !== 'string') {
		throw new Error('Invalid Id');
	}

	const user = await prisma.user.findUnique({
		where: {
			id: currentUser.id,
		},
	});

	if (!user) {
		throw new Error('Invalid Id');
	}

	const blockedUser = await prisma.user.findUnique({
		where: {
			id: userId,
		},
	});

	if (!blockedUser) {
		throw new Error('Invalid ID');
	}

	let updatedBlockedIds = [...(currentUser.blockedUserIds || [])];
	updatedBlockedIds.push(userId);

	const updatedUser = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			blockedUserIds: updatedBlockedIds,
		},
	});

	return NextResponse.json(updatedUser);
}

export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { userId } = params;

	if (!userId || typeof userId !== 'string') {
		throw new Error('Invalid Id');
	}

	const user = await prisma.user.findUnique({
		where: {
			id: currentUser.id,
		},
	});

	if (!user) {
		throw new Error('Invalid Id');
	}

	let updatedBlockedIds = [...(currentUser.blockedUserIds || [])];

	updatedBlockedIds = updatedBlockedIds.filter((id) => id !== userId);

	const updatedUser = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			blockedUserIds: updatedBlockedIds,
		},
	});

	return NextResponse.json(updatedUser);
}
