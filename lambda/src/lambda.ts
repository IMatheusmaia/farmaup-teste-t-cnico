import Fastify from "fastify";
import { awsLambdaFastify } from "@fastify/aws-lambda";
import { FastifyRequest } from "fastify";

import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import type { ZodTypeProvider } from "fastify-type-provider-zod";
import { bootstrap } from "./routes/client.route.js";

const fastify = Fastify({
    logger: true
});

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
fastify.withTypeProvider<ZodTypeProvider>();

const app = await bootstrap(fastify);
const proxy = awsLambdaFastify(app);

export const handler = (event:FastifyRequest, context:unknown) => proxy(event, context);

app.ready();



