import { Box } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import InitiativeList from "../../../components/initiative-list/initiative-list";
import { useCampaignSubscription } from "../../../graphql/client-types";

export default function InitiativeOverlay() {
	const router = useRouter();
	const { campaignId } = router.query;
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	return (
		!!data?.campaign?.activeEncounter?.round && (
			<>
				<Head>
					<title>{`${
						data.campaign.activeEncounter.name ?? "Encounter"
					} Initiative | OBS GM Overlay`}</title>
				</Head>
				<Box
					sx={{
						display: "inline-flex",
						flexDirection: "column",
						width: "auto",
						justifyContent: "space-around",
						border: "80px solid transparent",
						borderImage: "url(/celtic-frame.png)",
						borderImageSlice: "320 fill",
					}}
				>
					<InitiativeList campaign={data?.campaign} />
				</Box>
			</>
		)
	);
}
