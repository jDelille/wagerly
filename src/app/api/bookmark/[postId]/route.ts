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
		throw new Error('Invalid Id');
	}

	let updatedBookmarkIds = [...(currentUser.bookmarks || [])];

	updatedBookmarkIds = updatedBookmarkIds.filter(
		(bookmarkId) => bookmarkId !== postId
	);

	const updatedBookmark = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			bookmarks: updatedBookmarkIds,
		},
	});

	return NextResponse.json(updatedBookmark);
}
