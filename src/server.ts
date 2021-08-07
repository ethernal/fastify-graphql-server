import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify';

import { routes } from './routes/routes';

const server: FastifyInstance = fastify({ logger: false });
const address = "127.0.0.1";
const PORT = 3000;

server.register(routes);

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
