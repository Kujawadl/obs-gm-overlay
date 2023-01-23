import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import SequelizeAdapter from "@next-auth/sequelize-adapter";
import { Sequelize } from "sequelize";
import postgres from "postgres";
import { AccountModel, UserModel } from "../../../graphql/models";

const dbOptions = {
	host: process.env.DB_HOST,
	username: process.env.DB_USER,
	password: process.env.DB_PASSWORD,
	database: process.env.DB_NAME,
	port: parseInt(process.env.DB_PORT || "") || 5432,
};

const sequelize = new Sequelize({
	dialect: "postgres",
	...dbOptions,
});

const sql = postgres(dbOptions);
const User = new UserModel(sql);
const Account = new AccountModel(sql);

export const authOptions: AuthOptions = {
	providers: [
		process.env.GOOGLE_ID &&
			process.env.GOOGLE_SECRET &&
			GoogleProvider({
				clientId: process.env.GOOGLE_ID,
				clientSecret: process.env.GOOGLE_SECRET,
			}),
	].filter(Boolean) as AuthOptions["providers"],
	adapter: SequelizeAdapter(sequelize, { synchronize: false }),
	session: {
		strategy: "jwt",
	},
	callbacks: {
		async signIn({ user, account }) {
			try {
				if (user?.email && account) {
					const existingUser = await User.get(user.email);
					if (!existingUser) return "/invite-only";

					const existingAccount = await Account.get(
						account.provider,
						account.providerAccountId
					);
					if (!existingAccount) {
						const newAccount = {
							userId: existingUser.id,
							type: account.type,
							provider: account.provider,
							providerAccountId: account.providerAccountId,
							refresh_token: account.refresh_token,
							access_token: account.access_token,
							expires_at: account.expires_at?.toString(),
							token_type: account.token_type,
							scope: account.scope,
							id_token: account.id_token,
							session_state: account.session_state,
						};
						await Account.create(newAccount);
					}

					return true;
				}
			} catch (error) {
				console.error(error);
			}
			return false;
		},
	},
};

export default NextAuth(authOptions);
