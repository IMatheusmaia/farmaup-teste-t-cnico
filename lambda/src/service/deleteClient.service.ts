import { DeleteItemCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../config/aws/client/dynamoDbClient";

export async function deleteClient(clientId: string) {
    const clientDb = await dynamoDBClient();
    const command = new DeleteItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: {
            "id": { "S": clientId }
        }
    });

    try {
        clientDb.send(command);
    } catch (err) {
        console.error(err);
        throw new Error("Erro ao deletar cliente");
    }
}