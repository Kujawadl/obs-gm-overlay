import type { Sql } from "postgres";

interface Account {
	id: string;
	userId: string;
	type: string;
	provider: string;
	providerAccountId: string;
	refresh_token?: string;
	access_token?: string;
	expires_at?: string;
	token_type?: string;
	scope?: string;
	id_token?: string;
	session_state?: string;
}

type AccountInput = Omit<Account, "id"> & Partial<Pick<Account, "id">>;

export default class AccountModel {
	private sql: Sql;

	constructor(sql: Sql) {
		this.sql = sql;
	}

	async get(provider: string, providerAccountId: string): Promise<Account> {
		const results = await this.sql<Account[]>`
			SELECT *
			FROM "accounts"
			WHERE
				"provider" = ${provider} AND
				"provider_account_id" = ${providerAccountId}
		`;
		return results[0];
	}

	async create(account: AccountInput) {
		const results = await this.sql<Account[]>`
			INSERT INTO "accounts" (
				"id",
				"user_id",
				"type",
				"provider",
				"provider_account_id",
				"refresh_token",
				"access_token",
				"expires_at",
				"token_type",
				"scope",
				"id_token",
				"session_state"
			) VALUES (
				uuid_generate_v4(),
				${account.userId},
				${account.type},
				${account.provider},
				${account.providerAccountId},
				${account.refresh_token ?? null},
				${account.access_token ?? null},
				${account.expires_at ?? null},
				${account.token_type ?? null},
				${account.scope ?? null},
				${account.id_token ?? null},
				${account.session_state ?? null}
			)
		`;
		return results[0];
	}
}
