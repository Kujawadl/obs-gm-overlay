import type { AppProps } from "next/app";
import Head from "next/head";
import {
  ApolloClient,
  InMemoryCache,
  ApolloProvider,
  split,
  HttpLink,
} from "@apollo/client";
import { getMainDefinition } from "@apollo/client/utilities";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";

const httpLink = new HttpLink({
  uri: "http://localhost:4000/",
});

const wsLink = process.browser
  ? new GraphQLWsLink(
      createClient({
        url: "ws://localhost:4000/subscriptions",
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

const client = new ApolloClient({
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

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <ApolloProvider client={client}>
      <Head>
        <title>OBS GM Overlay</title>
        <meta name="description" content="OBS GM Overlay" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
