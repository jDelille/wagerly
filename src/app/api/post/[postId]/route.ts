import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
	postId?: string;
}
export async function DELETE(
	request: Request,
	{ params }: { params: IParams }
) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { postId } = params;

	if (!postId || typeof postId !== 'string') {
		throw new Error('Invalid ID');
	}

	const post = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			user: true,
			Bet: true,
			UserBet: true,
		},
	});

	if (!post) {
		return NextResponse.error();
	}

	await prisma.comment.deleteMany({
		where: {
			postId: postId,
		},
	});

	await prisma.post.delete({
		where: {
			id: postId,
		},
	});

	return NextResponse.json(post);
}
