import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDbClient } from "../config/aws/client/dynamoDbClient.js";

export async function getAllClients(): Promise<Record<string, any> | undefined> {
    const command = new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
    });

    try {
        const data = await dynamoDbClient.send(command);
        console.log("Success", data.Items);
        return data.Items;
    } catch (err) {
        console.error(err);
    }
}