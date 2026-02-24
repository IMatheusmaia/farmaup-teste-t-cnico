import type { FastifyInstance } from "fastify";
import { createClientValidation } from "../schemas/validation/createClientValidation";
import { createClientController } from "../controller/createClient.controller";
import { getClientByIdController } from "../controller/getClientById.controller";
import { getClientByIdValidation } from "../schemas/validation/getClientByIdValidation";
import { getAllClientsController } from "../controller/getAllClients.controller";
import { getAllClientsValidation } from "../schemas/validation/getAllClientsValidation";
import { updateClientController } from "../controller/updateClient.controller";
import { updateClientValidation } from "../schemas/validation/updateClientValidation";
import { deleteClientController } from "../controller/deleteClient.controller";
import { deleteClientValidation } from "../schemas/validation/deleteClientValidation";

export async function routes(fastify: FastifyInstance) {
    fastify.get('/clientes', { schema: getAllClientsValidation }, getAllClientsController);

    fastify.get('/clientes/:id', { schema: getClientByIdValidation }, getClientByIdController);

    fastify.post('/clientes', { schema: createClientValidation }, createClientController);

    fastify.put('/clientes/:id', { schema: updateClientValidation }, updateClientController);

    fastify.delete('/clientes/:id', { schema: deleteClientValidation }, deleteClientController);

    return fastify;
}