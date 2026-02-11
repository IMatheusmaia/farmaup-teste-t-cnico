import 'dotenv/config';
import Fastify from "fastify";
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { clientRoutes } from "./routes/client.route.js";

const fastify = Fastify({
    logger: true
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