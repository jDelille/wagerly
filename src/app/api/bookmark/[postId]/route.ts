import { NextResponse } from 'next/server';
import prisma from '@/app/libs/prismadb';
import getCurrentUser from '@/app/actions/getCurrentUser';

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

	let updatedBookmarkIds = [...(currentUser.bookmarks || [])];
	updatedBookmarkIds.push(postId);

	const newBookmark = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			bookmarks: updatedBookmarkIds,
		},
	});

	return NextResponse.json(newBookmark);
}
