import { STSClient, AssumeRoleCommand } from "@aws-sdk/client-sts";

const clientSts = new STSClient({ region: process.env.AWS_REGION, endpoint: process.env.AWS_ENDPOINT });

export const assumeRole = async (): Promise<{
    accessKeyId: string | undefined;
    secretAccessKey: string | undefined;
    sessionToken: string | undefined;
}> => {
    const command = new AssumeRoleCommand({
        RoleArn: process.env.AWS_ROLE_ARN,
        RoleSessionName: "app-farmaup-api",
    });

    const response = await clientSts.send(command);

    if (!response.Credentials) {
        throw new Error("STS did not return credentials");
    }

    return {
        accessKeyId: response.Credentials.AccessKeyId,
        secretAccessKey: response.Credentials.SecretAccessKey,
        sessionToken: response.Credentials.SessionToken,
    };
};