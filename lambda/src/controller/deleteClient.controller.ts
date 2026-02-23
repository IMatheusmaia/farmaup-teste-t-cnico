import type { FastifyReply, FastifyRequest } from "fastify";
import { getClientById } from "../service/getClientById.service.js";
import { deleteClient } from "../service/deleteClient.service.js";

export async function deleteClientController(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    try {
        const client = await getClientById(id);
        if (!client) {
            return reply.status(404).send({ message: 'Cliente não existe para ser deletado' });
        }
        await deleteClient(id);

        return reply.status(200).send({ message: 'Cliente deletado com sucesso' });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Erro inesperado ao deletar cliente' });
    }
}