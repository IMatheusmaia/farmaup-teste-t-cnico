import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

const REGION = process.env.AWS_REGION;

const clientSts = new STSClient({ region: REGION });

export const assumeRole = async () => {
    const command = new AssumeRoleCommand({
        RoleArn: process.env.AWS_ROLE_ARN,
        RoleSessionName: "app-session",
    });

    const response = await clientSts.send(command);

    if (!response.Credentials) {
        throw new Error("STS did not return credentials");
    }

    return {
        accessKeyId: response.Credentials.AccessKeyId,
        secretAccessKey: response.Credentials.SecretAccessKey,
        sessionToken: response.Credentials.SessionToken,
    }
};