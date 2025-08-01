import {
	ApolloClient,
	from,
	HttpLink,
	InMemoryCache,
	split,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

export default function useApolloClient() {
	const host = (protocol: "http" | "ws") =>
		`${protocol}${process.env.NEXT_PUBLIC_HTTPS === "true" ? "s" : ""}://${
			process.env.NEXT_PUBLIC_HOST
		}${
			process.env.NEXT_PUBLIC_PORT ? `:${process.env.NEXT_PUBLIC_PORT}` : ""
		}/api/${protocol === "http" ? "graphql" : "subscriptions"}`;
	const httpLink = new HttpLink({
		uri: host("http"),
	});

	const wsLink = process.browser
		? new GraphQLWsLink(
				createClient({
					url: host("ws"),
				}),
			)
		: null;

	const splitLink = process.browser
		? split(
				({ query }) => {
					const definition = getMainDefinition(query);
					return (
						definition.kind === "OperationDefinition" &&
						definition.operation === "subscription"
					);
				},
				wsLink as GraphQLWsLink,
				httpLink,
			)
		: httpLink;

	return new ApolloClient({
		link: from([splitLink]),
		cache: new InMemoryCache({
			typePolicies: {
				Campaign: {
					fields: {
						players: {
							merge(_existing, incoming) {
								/**
								 * In this case, the incoming value is the source of truth. We
								 * aren't paginating or lazy loading or anything like that, so
								 * the incoming array is always the full array.
								 *
								 * This function duplicates the default behavior, but suppresses
								 * the warning about it possibly being an error.
								 */
								return incoming;
							},
						},
					},
				},
			},
		}),
	});
}
