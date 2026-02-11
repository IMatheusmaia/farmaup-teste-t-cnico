import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { assumeRole } from "../credential/assumeRole.js";

const credential = await assumeRole();

if (!credential.accessKeyId || !credential.secretAccessKey) {
    throw new Error("Failed to obtain valid AWS credentials");
}

const dynamoDbClient = new DynamoDBClient({
    region: process.env.AWS_REGION,
    endpoint: process.env.AWS_ENDPOINT,
    credentials: { ...credential }
} as any);

export { dynamoDbClient };