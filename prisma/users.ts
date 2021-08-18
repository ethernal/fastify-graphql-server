import { Prisma } from '@prisma/client';

export const users: Prisma.UserCreateManyInput[] = [
	{
		id: "1",
		email: "admin1@example.com",
		login: "admin1",
		password: "admin",
	},
	{
		id: "2",
		email: "admin2@example.com",
		login: "admin2",
		password: "admin",
	},
	{
		id: "3",
		email: "admin3@example.com",
		login: "admin3",
		password: "admin",
	},
	{
		id: "4",
		email: "admin4@example.com",
		login: "admin4",
		password: "admin",
	},
];
