import { awsLambdaFastify } from "@fastify/aws-lambda";
import { FastifyRequest } from "fastify";
import bootstrap from "./app";

const app = bootstrap();
const proxy = awsLambdaFastify(app);

export const handler = (event:FastifyRequest, context:unknown) => proxy(event, context);

app.ready();