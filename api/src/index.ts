import 'dotenv/config';
import Fastify from "fastify";
import cors from '@fastify/cors';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { clientRoutes } from "./routes/client.route.js";

const fastify = Fastify({
    logger: true
});

await fastify.register(cors, {
    origin: ['http://localhost:4322', 'http://localhost:8080'],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
    credentials: true
});

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
fastify.withTypeProvider<ZodTypeProvider>();

fastify.register(clientRoutes);

fastify.listen({ port: 3030, host: '0.0.0.0' }, (err, address) => {
    if (err) {
        console.error(err)
        process.exit(1)
    }
    console.log(`Server listening on ${address}`)
});