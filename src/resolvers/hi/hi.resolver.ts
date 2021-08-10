import { IResolvers } from 'mercurius';

const resolvers: IResolvers = {
	Query: {
		hi(root, { name }, ctx, info) {
			// root ~ {}
			// name ~ string
			// ctx.authorization ~ string | undefined
			// info ~ GraphQLResolveInfo
			return "Hi " + name;
		},
	},
};

export default resolvers;
