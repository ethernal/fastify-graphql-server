import { IResolvers } from "mercurius";

import { User as PrismaUser } from "@prisma/client";

// import { User } from '../../generated/typings/generatedTypings';

const resolvers: IResolvers = {
	Query: {
		user: async (root, { userId }, ctx, info) => {
			let result = null;
			console.log(`User ID: ${userId}`);

			const userData: PrismaUser | null = await ctx.prisma.user.findUnique({
				where: { id: userId! },
			});

			if (userData) {
				const user: any = {
					id: userData.id,
					email: userData.email,
					login: userData.login,
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
