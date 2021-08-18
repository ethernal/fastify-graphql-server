import { Prisma } from '@prisma/client';

export const userPersonalData: Prisma.PersonalDataCreateInput[] = [
	{
		firstName: "Sebastian",
		middleName: "Damian",
		lastName: "Pieczyński",
		summary:
			"Life long learner and a helping hand. Software developer focused on user experience and ease of use.",
		user: {
			connect: {
				id: "1",
			},
		},
	},
	{
		firstName: "Rafał",
		middleName: "Andrzej",
		lastName: "Pieczyński",
		summary:
			"Extremely gifted board games designer. Can master any board game within a session or two. Plays Go and guitar.",
		user: {
			connect: {
				id: "2",
			},
		},
	},
	{
		firstName: "John",
		lastName: "Wick",
		summary: "Is a Man of Focus, Commitment and Sheer F***g Will",
		user: {
			connect: {
				id: "3",
			},
		},
	},
	{
		firstName: "Thomas",
		middleName: "A.",
		lastName: "Anderson",
		summary: "My name is Neo..",
		user: {
			connect: {
				id: "4",
			},
		},
	},
];
