import { PutItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../config/aws/client/dynamoDbClient";
import { preventCollisionID } from "../utils/preventColisionID";
import type { ClientType } from "../types/client";

export async function createClient(client: ClientType): Promise<void> {
    const clientDb = await dynamoDBClient();
    const randomId = await preventCollisionID();

    const command = new PutItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Item: {
            "id": { "S": randomId },
            "name": { "S": client.name },
            "email": { "S": client.email },
            "phone": { "S": client.phone },
            "city": { "S": client.city }
        }
    });

    try {
        const data = await clientDb.send(command);
        console.log("Success", data.$metadata);
    } catch (err) {
        console.error(err);
    }
}