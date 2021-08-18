import { IResolvers } from 'mercurius';

import { User } from '@prisma/client';

const resolvers: IResolvers = {
	Query: {
		user: async (root, { userId }, ctx, info) => {
			let result = null;

			const userData: User | null = await ctx.prisma.user.findUnique({
				where: { id: userId! },
			});

			if (!userData) {
				console.error(`User with ID: ${userId} not found.`);
				throw new Error("User not found");
			}

			return userData;

			// root ~ {}
			// args ~ variables passed to query
			// ctx.authorization ~ string | undefined
			// info ~ GraphQLResolveInfo
		},
	},
};

export default resolvers;
