import type { FastifyInstance } from "fastify";
import { createClientValidation } from "../schemas/validation/createClientValidation.js";
import { createClientController } from "../controller/createClient.controller.js";

export async function clientRoutes(fastify: FastifyInstance) {
    // fastify.get('/clientes', async (request, reply) => {
    //     return { hello: 'world' }
    // });

    // fastify.get('/clientes/:id', async (request, reply) => {
    //     return { hello: 'world' }
    // });

    fastify.post('/clientes', { schema: createClientValidation }, createClientController);

    // fastify.put('/clientes/:id', async (request, reply) => {
    //     return { hello: 'world' }
    // });

    // fastify.delete('/clientes/:id', async (request, reply) => {
    //     return { hello: 'world' }
    // });
}