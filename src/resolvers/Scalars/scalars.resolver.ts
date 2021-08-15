import { resolvers as scalarResolvers } from "graphql-scalars";

const resolvers = {
	Date: scalarResolvers.Date,
	DateTime: scalarResolvers.DateTime,
	Email: scalarResolvers.EmailAddress,
};

export default resolvers;
