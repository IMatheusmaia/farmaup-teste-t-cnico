import fastify from "./server.js";

fastify.get('/', async (request, reply) => {
    return { hello: 'world' }
});