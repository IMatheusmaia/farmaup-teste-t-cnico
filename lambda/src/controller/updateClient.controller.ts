import type { FastifyReply, FastifyRequest } from "fastify";
import { updateClient } from "../service/updateClient.service.js";
import { getClientById } from "../service/getClientById.service.js"
import type { ClientType } from "../types/client.js";

export async function updateClientController(request: FastifyRequest, reply: FastifyReply) {
    try {
        const { id } = request.params as { id: string };
        const client = await getClientById(id);
        if (!client) {
            return reply.status(404).send({ message: "Cliente não encontrado" });
        }
        const clientData = request.body as Partial<ClientType>;
        const updatedClient = await updateClient(id, clientData);
        return reply.status(200).send({
            message: "Cliente atualizado com sucesso",
            data: updatedClient
        });
    } catch (error) {
        console.error("Erro ao atualizar cliente:", error);
        return reply.status(500).send({ error: "Erro inesperado ao atualizar cliente" });
    }
}