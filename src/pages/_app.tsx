import { useMemo } from "react";
import Head from "next/head";
import { ApolloProvider } from "@apollo/client";
import setupApolloClient from "../graphql/setup-apollo-client";
import type { AppProps } from "next/app";
import "./global.css";

function MyApp({ Component, pageProps }: AppProps) {
	const apolloClient = useMemo(setupApolloClient, []);
	return (
		<ApolloProvider client={apolloClient}>
			<Head>
				<meta name="description" content="OBS GM Overlay" />
				<meta name="viewport" content="initial-scale=1, width=device-width" />
			</Head>
			<Component {...pageProps} />
		</ApolloProvider>
	);
}

export default MyApp;
