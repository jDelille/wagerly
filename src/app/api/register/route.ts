import bcrypt from 'bcrypt';
import prisma from '@/app/libs/prismadb';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
	const body = await request.json();
	const { email, name, username, password, photo } = body;

	const existingUser = await prisma.user.findUnique({
		where: {
			username,
		},
	});

	if (existingUser) {
		return new NextResponse('Username already taken', { status: 400 });
	}

	const hashedPassword = await bcrypt.hash(password, 12);

	try {
		const user = await prisma.user.create({
			data: {
				email,
				name,
				username,
				password: hashedPassword,
				photo,
			},
		});

		return new NextResponse(JSON.stringify(user), { status: 200 });
	} catch (error) {
		// Handle any potential errors during user creation
		console.error('Error creating user:', error);
		return new NextResponse('Failed to create user', { status: 500 });
	}
}
