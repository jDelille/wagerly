import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();
	const { name, username, bio, photo, draftKings, betSperts, coverPhoto } =
		body;
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const data: any = {};

	if (name) {
		data.name = name;
	}

	if (username) {
		data.username = username;
	}

	if (bio) {
		data.bio = bio;
	}

	if (photo) {
		data.photo = photo;
	}

	if (draftKings) {
		data.draftKingsLink = draftKings;
	}

	if (betSperts) {
		data.betSpertsLink = betSperts;
	}

	if (coverPhoto) {
		data.coverPhoto = coverPhoto;
	}

	try {
		const user = await prisma.user.update({
			where: {
				id: currentUser?.id,
			},
			data,
		});

		return NextResponse.json(user);
	} catch (error) {
		console.error(error);
		return NextResponse.error();
	}
}
