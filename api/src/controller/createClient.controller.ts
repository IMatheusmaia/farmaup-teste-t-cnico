import type { FastifyReply, FastifyRequest } from "fastify";

async function createClientController(request: FastifyRequest, reply: FastifyReply) {

    return reply.status(201).send({ message: 'Cliente criado com sucesso' });

}

export { createClientController };