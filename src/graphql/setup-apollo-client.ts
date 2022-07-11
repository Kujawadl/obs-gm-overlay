import { ApolloClient, HttpLink, InMemoryCache, split } from "@apollo/client";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { getMainDefinition } from "@apollo/client/utilities";
import { createClient } from "graphql-ws";

function setupApolloClient() {
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

	return new ApolloClient({
		link: splitLink,
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

export default setupApolloClient;
