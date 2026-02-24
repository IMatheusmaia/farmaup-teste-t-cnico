import { UpdateItemCommand, type AttributeValue } from "@aws-sdk/client-dynamodb";
import { dynamoDBClient } from "../config/aws/client/dynamoDbClient";
import { unmarshall } from "@aws-sdk/util-dynamodb";
import type { ClientType } from "../types/client";

export async function updateClient(
    clientId: string,
    clientData: Partial<ClientType>
) {
    const clientDb = await dynamoDBClient();

    const updateFields = Object.entries(clientData).filter(
        ([_, value]) => value !== undefined && value !== null
    );

    if (updateFields.length === 0) {
        throw new Error("Nenhum campo para atualizar");
    }

    const updateExpression = `SET ${updateFields
        .map(([key], index) => `#field${index} = :value${index}`)
        .join(", ")}`;

    const expressionAttributeNames = updateFields.reduce(
        (acc, [key], index) => ({
            ...acc,
            [`#field${index}`]: key
        }),
        {}
    );

    const expressionAttributeValues = updateFields.reduce(
        (acc, [_, value], index) => ({
            ...acc,
            [`:value${index}`]: { S: value as string }
        }),
        {}
    );

    const command = new UpdateItemCommand({
        TableName: process.env.DYNAMODB_TABLE_NAME,
        Key: {
            id: { S: clientId }
        },
        UpdateExpression: updateExpression,
        ExpressionAttributeNames: expressionAttributeNames,
        ExpressionAttributeValues: expressionAttributeValues,
        ReturnValues: "ALL_NEW"
    });

    try {
        const data = await clientDb.send(command);

        if (!data.Attributes) {
            throw new Error("Falha ao atualizar cliente");
        }

        return unmarshall(data.Attributes as Record<string, AttributeValue>);
    } catch (err) {
        console.error("Erro ao atualizar cliente:", err);
        throw err;
    }
}