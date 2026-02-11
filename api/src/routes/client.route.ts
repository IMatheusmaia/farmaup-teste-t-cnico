import type { FastifyInstance } from "fastify";
import { createClientValidation } from "../schemas/validation/createClientValidation.js";
import { createClientController } from "../controller/createClient.controller.js";
import { getClientByIdController } from "../controller/getClientById.controller.js";
import { getClientByIdValidation } from "../schemas/validation/getClientByIdValidation.js";
import { getAllClientsController } from "../controller/getAllClients.controller.js";
import { getAllClientsValidation } from "../schemas/validation/getAllClientsValidation.js";

export async function clientRoutes(fastify: FastifyInstance) {
    fastify.get('/clientes', { schema: getAllClientsValidation }, getAllClientsController);

    fastify.get('/clientes/:id', { schema: getClientByIdValidation }, getClientByIdController);

    fastify.post('/clientes', { schema: createClientValidation }, createClientController);
}