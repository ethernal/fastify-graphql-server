import AltairFastify from 'altair-fastify-plugin';
import dotenv from 'dotenv';
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';
import fastifyCors from 'fastify-cors';
import mercurius from 'mercurius';
import mercuriusCodegen from 'mercurius-codegen';

import { PrismaClient } from '@prisma/client';

// Import typeDefs after merging
import schema from './graphql/typeDefs';
// Import merged RESOLVERS generated from files in resolvers directory
import resolvers from './resolvers/mergedResolvers';
// Import routes for Fastify
import { routes } from './routes/routes';

const prisma = new PrismaClient();

// Prepare Fastify server
export const server: FastifyInstance = fastify({ logger: false });
// Configure server connection data
// TODO: move these to .env file
const SERVER_ADDRESS = process.env.SERVER_ADDRESS || "127.0.0.1";
const SERVER_PORT = process.env.SERVER_PORT || 3000;

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

function generateTypings() {
	console.log("Generating Typings");
	mercuriusCodegen(server, {
		// Commonly relative to your root package.json
		targetPath: "./src/generated/typings/generatedTypings.ts",
		// You can also specify an array of globs
		operationsGlob: "./src/graphql/schema/operations/**/*.graphql",
	})
		.then(() => console.log("Generated Typings"))
		.catch(console.error);
}

// Import routes for the server to use
server.register(routes);
server.register(mercurius, {
	schema,
	resolvers,
	context: buildContext,

	// Disable the GraphiQL and use Altair instead
	graphiql: false,
	ide: false,
	// Set the path to the API to default /graphql
	path: "/graphql",
});

server.register(AltairFastify, {
	path: "/altair",
	baseURL: "/altair/",
	// 'endpointURL' MUST be the same as the mercurius 'path'
	endpointURL: "/graphql",
});

// Configure the server based on the env being used
if (process.env.NODE_ENV === "development") {
	dotenv.config();
	// Cross Origin Resource Sharing from any domain during development
	server.register(fastifyCors, { origin: "*" });
	generateTypings();
} else if (process.env.NODE_ENV === "test") {
	server.register(fastifyCors, { origin: "*" });
} else if (process.env.NODE_ENV === "production") {
	// Use setting in ENV variables setup on the server
	server.register(fastifyCors, { origin: process.env.CORS_ORIGIN });
}

const start = async () => {
	try {
		await server.listen(SERVER_PORT, SERVER_ADDRESS);
		console.log(`Running in "${process.env.NODE_ENV}" mode.`);
		console.log(`Server listening at ${SERVER_ADDRESS}:${SERVER_PORT}`);
	} catch (err) {
		server.log.error(err);
		process.exit(1);
	}
};
start();
