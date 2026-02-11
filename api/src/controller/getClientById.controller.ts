import { getClientById } from "../service/getClientById.service.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getClientByIdController(request: FastifyRequest, reply: FastifyReply) {
    const { id } = request.params as { id: string };
    try {
        const client = await getClientById(id);
        if (!client) {
            return reply.status(404).send({ message: 'Cliente não encontrado' });
        }
        return reply.status(200).send({ message: 'Cliente encontrado com sucesso', data: client });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Erro inesperado ao buscar cliente' });
    }
}