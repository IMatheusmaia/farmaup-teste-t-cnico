import { GetItemCommand, type AttributeValue } from "@aws-sdk/client-dynamodb";
import { dynamoDbClient } from "../config/aws/client/dynamoDbClient.js";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import type { ClientType } from "../types/client.js";

export async function getClientById(clientId: string) {
    const command = new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: {
            "id": { "S": clientId }
        }
    });

    try {
        const data = await dynamoDbClient.send(command);
        return unmarshall(data.Item as Record<string, AttributeValue>);

    } catch (err) {
        console.error(err);
    }
}