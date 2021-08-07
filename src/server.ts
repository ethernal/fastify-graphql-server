import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import mercurius, { IResolvers } from 'mercurius';
import mercuriusCodegen, { gql } from 'mercurius-codegen';

// Import routes for Fastify
import { routes } from './routes/routes';

// Prepare Fastify server
const server: FastifyInstance = fastify({ logger: false });
// Configure server data
const address = "127.0.0.1";
const PORT = 3000;

// Mercurius with Typescript configuration
const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
	return {
		authorization: req.headers.authorization,
	};
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
	interface MercuriusContext
		extends PromiseType<ReturnType<typeof buildContext>> {}
}
// End of Mercurius with Typescript configuration

// Using the fake "gql" from mercurius-codegen gives tooling support for
// "prettier formatting" and "IDE syntax highlighting".
// It's optional
const schema = gql`
	type Query {
		hello(name: String!): String!
		# add(x: Int, y:Int}:Int
	}
`;

const resolvers: IResolvers = {
	Query: {
		hello(root, { name }, ctx, info) {
			// root ~ {}
			// name ~ string
			// ctx.authorization ~ string | undefined
			// info ~ GraphQLResolveInfo
			return "hello " + name;
		},
	},
};

server.register(routes);

server.register(mercurius, {
	schema,
	resolvers,
	context: buildContext,
	graphiql: "graphiql",
});

mercuriusCodegen(server, {
	// Commonly relative to your root package.json
	targetPath: "./src/graphql/generated.ts",
}).catch(console.error);

const start = async () => {
	try {
		await server.listen(PORT, address);
		console.log(`Server listening at ${address}:${PORT}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};
start();
