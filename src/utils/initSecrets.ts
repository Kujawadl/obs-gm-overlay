import AWS from "aws-sdk";

export async function initSecrets() {
	if (
		process.env.NODE_ENV === "production" &&
		process.env.SECRET &&
		!process.env.SECRETS_INITIALIZED
	) {
		console.log("Fetching secrets");
		const secretsManager = new AWS.SecretsManager({
			region: process.env.SECRET_REGION ?? "us-east-2",
		});
		const secretData = await secretsManager
			.getSecretValue({ SecretId: process.env.SECRET })
			.promise();
		const secretValues = JSON.parse(secretData?.SecretString || "{}");
		for (let [key, value] of Object.entries(secretValues)) {
			process.env[key] = value as string;
		}
		process.env.SECRETS_INITIALIZED = "true";
		console.log("Secrets fetched!");
	}
}
