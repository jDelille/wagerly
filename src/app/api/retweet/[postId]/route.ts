import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

interface IParams {
	postId?: string;
}

export async function POST(request: Request, { params }: { params: IParams }) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const { postId } = params;

	if (!postId || typeof postId !== 'string') {
		throw new Error('Invalid Id');
	}

	const body = await request.json();
	const { postData } = body;

	const originalPost = await prisma.post.findUnique({
		where: {
			id: postId,
		},
		include: {
			UserBet: true,
		},
	});

	if (!originalPost) {
		throw new Error('Invalid Id');
	}

	const retweet = await prisma.post.create({
		data: {
			body: originalPost.body || originalPost.UserBet?.body,
			userId: originalPost.userId,
			retweetedFromUsername: currentUser.username,
			userBetId: originalPost.userBetId,
			// Copy any other necessary fields from the original post
			// such as photo, name, username, etc.
		},
	});

	return NextResponse.json({ retweet });
}
