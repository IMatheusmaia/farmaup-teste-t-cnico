import z from "zod";
import type { FastifySchema } from "fastify";

export const updateClientValidation = {
    params: z.object({
        id: z.string().regex(/^\d{10}$/, { message: "O id deve conter exatamente 10 números." })
    }),
    body: z.object({
        name: z.string().min(3, { message: "O nome deve conter pelo menos 3 caracteres." }).optional(),
        email: z.string().regex(/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, { message: "O e-mail deve ser um e-mail válido." }).optional(),
        phone: z.string().regex(/^\d{11}$/, { message: "O telefone deve conter exatamente 11 números." }).optional(),
        city: z.string().min(3, { message: "A cidade deve conter pelo menos 3 caracteres." }).optional()
    }),
    response: {
        200: z.object({
            message: z.string(),
            data: z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                phone: z.string(),
                city: z.string()
            })
        }),
        404: z.object({
            message: z.string()
        })
    }
} as FastifySchema;