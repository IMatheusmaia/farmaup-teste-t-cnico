import z from "zod";
import type { FastifySchema } from "fastify";

export const deleteClientValidation = {
    params: z.object({
        id: z.string().regex(/^\d{10}$/, { message: "O campo deve conter exatamente 10 números." })
    }),
    response: {
        200: z.object({
            message: z.string()
        }),
        404: z.object({
            message: z.string()
        })
    }
} as FastifySchema;