import { DateTime } from 'graphql-scalars/typeDefs';

import { User } from '@prisma/client';

export const users: [User] = [
	{
		email: "admin@example.com",
		login: "admin",
		password: "admin",
		createdAt: new Date(),
		modifiedAt: null,
		id: "1",
		createdById: null,
	},
];
