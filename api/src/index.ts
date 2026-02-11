import fastify from "./server.js";
import { clientRoutes } from "./routes/client.route.js";
import { serializerCompiler, validatorCompiler } from 'fastify-type-provider-zod';
import type { ZodTypeProvider } from "fastify-type-provider-zod";

fastify.setValidatorCompiler(validatorCompiler);
fastify.setSerializerCompiler(serializerCompiler);
fastify.withTypeProvider<ZodTypeProvider>();

fastify.register(clientRoutes);