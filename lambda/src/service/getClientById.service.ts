import { GetItemCommand, type AttributeValue } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../config/aws/client/dynamoDbClient";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function getClientById(clientId: string) {
    const clientDb = await dynamoDBClient();
    const command = new GetItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: {
            "id": { "S": clientId }
        }
    });

    try {
        const data = await clientDb.send(command);
        return unmarshall(data.Item as Record<string, AttributeValue>);

    } catch (err) {
        console.error(err);
    }
}