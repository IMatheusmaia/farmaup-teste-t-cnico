import { ScanCommand } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../config/aws/client/dynamoDbClient";
import { unmarshall } from "@aws-sdk/util-dynamodb";

export async function getAllClients(): Promise<Record<string, any> | undefined> {
    const clientDb = await dynamoDBClient();
    const command = new ScanCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
    });

    try {
        const data = await clientDb.send(command);
        return data.Items?.map((item) => unmarshall(item));
    } catch (err) {
        console.error(err);
    }
}