import type { Sql } from "postgres";

interface User {
	id: string;
	name?: string;
	email?: string;
	emailVerified?: string;
	image?: string;
}

export default class UserModel {
	private sql: Sql;

	constructor(sql: Sql) {
		this.sql = sql;
	}

	async get(email: string): Promise<User> {
		const results = await this.sql<User[]>`
			SELECT *
			FROM "users"
			WHERE "email" = ${email}
		`;
		return results[0];
	}
}
