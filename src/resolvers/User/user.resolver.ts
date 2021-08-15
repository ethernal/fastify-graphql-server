import { IResolvers } from "mercurius";

import { User as PrismaUser } from "@prisma/client";

const resolvers: IResolvers = {
	Query: {
		user: async (root, { userId }, ctx, info) => {
			let result = null;

			const userData: PrismaUser | null = await ctx.prisma.user.findUnique({
				where: { id: userId! },
			});

			if (userData) {
				const user: any = {
					id: userData.id,
					email: userData.email,
					login: userData.login,
					createdAt: userData.createdAt,
				};
				result = user;
			} else {
				console.error(`User with ID: ${userId} not found.`);
				throw new Error("User not found");
			}

			// root ~ {}
			// args ~ variables passed to query
			// ctx.authorization ~ string | undefined
			// info ~ GraphQLResolveInfo
			return result;
		},
	},
};

export default resolvers;
