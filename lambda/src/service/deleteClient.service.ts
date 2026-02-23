import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDbClient } from "../config/aws/client/dynamoDbClient.js";

export async function deleteClient(clientId: string) {
    const command = new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: {
            "id": { "S": clientId }
        }
    });

    try {
        await dynamoDbClient.send(command);
    } catch (err) {
        console.error(err);
        throw new Error("Erro ao deletar cliente");
    }
}