import { IResolvers } from 'mercurius';

import { User as PrismaUser } from '@prisma/client';

// import { User } from '../../generated/typings/generatedTypings';

const resolvers: IResolvers = {
	Query: {
		user(root, { userId }, ctx, info) {
			//TODO:fix from any to Prisma user..
			const userData: any = ctx.prisma.user.findUnique({
				where: { id: userId! },
			});

			const user: any = {
				id: userData.id,
				email: userData.email,
				login: userData.login,
			};
			// root ~ {}
			// args ~ variables passed to query
			// ctx.authorization ~ string | undefined
			// info ~ GraphQLResolveInfo
			return user;
		},
	},
};

export default resolvers;
