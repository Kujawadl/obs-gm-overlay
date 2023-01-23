import {
	ApolloClient,
	HttpLink,
	InMemoryCache,
	split,
	from,
} from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { onError } from "@apollo/client/link/error";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";
import { signIn } from "next-auth/react";

export default function useApolloClient() {
	const httpLink = new HttpLink({
		uri: "http://localhost:3000/api/graphql",
	});

	const wsLink = process.browser
		? new GraphQLWsLink(
				createClient({
					url: "ws://localhost:3000/api/subscriptions",
				})
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
				httpLink
		  )
		: httpLink;

	const errorLink = onError(({ graphQLErrors }) => {
		if (
			graphQLErrors?.some(
				(error) => error?.extensions?.code === "UNAUTHENTICATED"
			)
		) {
			signIn();
		}
	});

	return new ApolloClient({
		link: from([errorLink, splitLink]),
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
