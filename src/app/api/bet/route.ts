import getCurrentUser from '@/app/actions/getCurrentUser';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const currentUser = await getCurrentUser();

	if (!currentUser) {
		return NextResponse.error();
	}

	const body = await request.json();

	const {
		payout,
		wager,
		date,
		bet,
		logo,
		name,
		description,
		odds,
		matchup,
		groupId,
		type,
		postBody,
	} = body;

	const newBet = await prisma.userBet.create({
		data: {
			date,
			matchup,
			bet,
			logo,
			name,
			description,
			odds,
			wager,
			payout,
			type,
			body: postBody,
		},
	});

	const newPost = await prisma.post.create({
		data: {
			userId: currentUser.id,
			userBetId: newBet.id,
			groupId,
		},
	});

	let totalBets = currentUser.totalBets;

	const updatedUser = await prisma.user.update({
		where: {
			id: currentUser.id,
		},
		data: {
			totalBets: (totalBets += 1),
		},
	});

	return NextResponse.json({ newPost, updatedUser });
}
