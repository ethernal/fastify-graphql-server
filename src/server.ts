import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import mercurius from 'mercurius';
import mercuriusCodegen from 'mercurius-codegen';

// mergeTypeDefs seems not to be needed as merging is done by importing multiple .graphql files
import { PrismaClient } from '@prisma/client';

// Import typeDefs after merging
import schema from './graphql/typeDefs';
// Import merged RESOLVERS generated from files in resolvers directory
import resolvers from './resolvers/mergedResolvers';
// Import routes for Fastify
import { routes } from './routes/routes';

const prisma = new PrismaClient();

// Prepare Fastify server
const server: FastifyInstance = fastify({ logger: false });
// Configure server connection data
// TODO: move these to .env file
const SERVER_ADDRESS = "127.0.0.1";
const SERVER_PORT = 3000;

// Mercurius with Typescript configuration

// context creation as a function - everything that is returned from this
// function will be inside the context
// authorization info is an example
const buildContext = async (req: FastifyRequest, _reply: FastifyReply) => {
	return {
		authorization: req.headers.authorization,
		prisma,
	};
};

type PromiseType<T> = T extends PromiseLike<infer U> ? U : T;

declare module "mercurius" {
	interface MercuriusContext
		extends PromiseType<ReturnType<typeof buildContext>> {}
}
// End of Mercurius with Typescript configuration

server.register(routes);

server.register(mercurius, {
	schema,
	resolvers,
	context: buildContext,
	// Enable the GraphiQL Playground
	graphiql: "graphiql",
});

mercuriusCodegen(server, {
	// Commonly relative to your root package.json
	targetPath: "./src/generated/typings/generatedTypings.ts",
	// You can also specify an array of globs
	// operationsGlob: "./src/graphql/schema/operations/**/*.graphql",
}).catch(console.error);

const start = async () => {
	try {
		await server.listen(SERVER_PORT, SERVER_ADDRESS);
		console.log(`Server listening at ${SERVER_ADDRESS}:${SERVER_PORT}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};
start();
