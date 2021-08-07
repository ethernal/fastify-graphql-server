import { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

export async function routes(fastify: FastifyInstance, options: Object) {
	fastify.get("/", async (request: FastifyRequest, reply: FastifyReply) => {
		return { hello: "routes" };
	});

	fastify.get("/heartbeat", async (request, reply) => {
		return { iam: "alive" };
	});
}
