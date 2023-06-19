import { Bet, Parlay, Post, User } from '@prisma/client';

export type ExtendedPost = Post & {
	user: User;
	comments: Comment[];
	Parlay: Parlay[];
	Bet: Bet;
};
