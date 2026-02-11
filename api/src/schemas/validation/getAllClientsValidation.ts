import z from "zod";
import type { FastifySchema } from "fastify";

export const getAllClientsValidation = {
    response: {
        200: z.object({
            message: z.string(),
            data: z.array(z.object({
                id: z.string(),
                name: z.string(),
                email: z.string(),
                phone: z.string(),
                city: z.string()
            }))
        }),
        404: z.object({
            message: z.string()
        })
    }
} as FastifySchema;