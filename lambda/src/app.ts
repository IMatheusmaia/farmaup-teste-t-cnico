import Fastify, { type FastifyInstance} from "fastify";
import cors from '@fastify/cors';
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { routes } from "./routes/client.route";

export default function bootstrap():FastifyInstance {
    const appInstance = Fastify({
        logger: true
    });

    appInstance.register(routes);

    appInstance.register(cors, {
        origin: '*',
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'OPTIONS'],
        allowedHeaders: '*'
    });

    appInstance.setValidatorCompiler(validatorCompiler);
    appInstance.setSerializerCompiler(serializerCompiler);
    appInstance.withTypeProvider<ZodTypeProvider>();

    return appInstance;
}