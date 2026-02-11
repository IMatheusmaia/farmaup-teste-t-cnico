import type { FastifyReply, FastifyRequest } from "fastify";
import { createClient } from "../service/createClient.service.js";

type CreateClientType = {
    name: string;
    email: string;
    phone: string;
    city: string;
}

export async function createClientController(request: FastifyRequest, reply: FastifyReply) {
    const client = request.body as CreateClientType;

    try {
        await createClient(client);
        return reply.status(201).send({ message: 'Cliente criado com sucesso' });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: 'Erro inesperado ao criar cliente' });
    }
};