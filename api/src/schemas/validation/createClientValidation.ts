import { z, type ZodObject } from "zod";
import type { ClientType } from "../../types/client.js";
import type { FastifySchema } from "fastify";

const clientSchema = z.object({
    name: z.string().min(3, 'O nome deve ter pelo menos 3 caracteres'),
    email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, 'Email inválido'),
    phone: z.string().min(11, 'Telefone inválido').regex(/^\d{11}$/, 'Telefone inválido'),
    city: z.string().min(3, 'A cidade deve ter pelo menos 3 caracteres'),
}) as ZodObject<ClientType>;

export const createClientValidation = {
    schema: {
        body: clientSchema,
        response: {
            201: z.object({
                message: z.string(),
            })
        }
    }
} as FastifySchema;