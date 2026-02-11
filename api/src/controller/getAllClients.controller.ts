import { getAllClients } from "../service/getAllClients.service.js";
import type { FastifyReply, FastifyRequest } from "fastify";

export async function getAllClientsController(_request: FastifyRequest, reply: FastifyReply) {
    try {
        const clients = await getAllClients();

        if (clients?.length === 0) {
            return reply.status(404).send({ message: "Nenhum cliente encontrado" });
        }

        return reply.status(200).send({ message: "Clientes encontrados com sucesso", data: clients });
    } catch (error) {
        console.error(error);
        return reply.status(500).send({ message: "Erro inesperado ao buscar clientes" });
    }

}