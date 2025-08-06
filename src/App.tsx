import React, { useMemo } from "react";
import { ApolloProvider } from "@apollo/client";
import { Routes, Route } from "react-router-dom";
import setupApolloClient from "@graphql/setup-apollo-client";
import Home from "@src/pages/index";
import EditCampaign from "@src/pages/[campaignId]/edit";
import InitiativeOverlay from "@src/pages/[campaignId]/overlay/initiative";
import InspirationOverlay from "@src/pages/[campaignId]/overlay/inspiration";
import EncounterEditor from "@src/pages/[campaignId]/encounter/[encounterId]/edit";
import RunInitiative from "@src/pages/[campaignId]/encounter/run";
import Encounters from "@src/pages/[campaignId]/encounter/index";
import Layout from "@src/components/layout";

function NotFound() {
	return <h1>404 - Not Found</h1>;
}
export default function App() {
	const apolloClient = useMemo(setupApolloClient, []);
	return (
		<ApolloProvider client={apolloClient}>
			<Routes>
				<Route element={<Layout />}>
					<Route path="/" element={<Home />} />
					<Route path=":campaignId/edit" element={<EditCampaign />} />
					<Route
						path=":campaignId/overlay/initiative"
						element={<InitiativeOverlay />}
					/>
					<Route
						path=":campaignId/overlay/inspiration"
						element={<InspirationOverlay />}
					/>
					<Route
						path=":campaignId/encounter/:encounterId/edit"
						element={<EncounterEditor />}
					/>
					<Route path=":campaignId/encounter/run" element={<RunInitiative />} />
					<Route path=":campaignId/encounter" element={<Encounters />} />
					<Route path="*" element={<NotFound />} />
				</Route>
			</Routes>
		</ApolloProvider>
	);
}
