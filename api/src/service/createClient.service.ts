import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDbClient } from "../config/aws/client/dynamoDbClient.js";
import { preventCollisionID } from "../utils/preventColisionID.js";
import type { ClientType } from "../types/client.js";

export async function createClient(client: ClientType): Promise<void> {
    const command = new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: {
            "id": { "S": await preventCollisionID() },
            "name": { "S": client.name },
            "email": { "S": client.email },
            "phone": { "S": client.phone },
            "city": { "S": client.city }
        }
    });

    try {
        const data = await dynamoDbClient.send(command);
        console.log("Success", data.$metadata);
    } catch (err) {
        console.error(err);
    }
}