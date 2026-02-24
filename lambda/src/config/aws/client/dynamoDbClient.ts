import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { assumeRole } from "../credential/assumeRole.js";

export async function dynamoDBClient() {
    const credential = await assumeRole();

if (!credential.accessKeyId || !credential.secretAccessKey) {
    throw new Error("Failed to obtain valid AWS credentials");
}

return new DynamoDBClient({
            region: process.env.AWS_REGION,
            credentials: { ...credential }
        } as any);
}