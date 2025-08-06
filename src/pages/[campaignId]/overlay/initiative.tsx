import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import InitiativeList from "@src/components/initiative-list/initiative-list";
import { useCampaignSubscription } from "@graphql/client-types";

export default function InitiativeOverlay() {
	const { campaignId } = useParams();
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	return (
		<>
			{!!data?.campaign?.activeEncounter?.round && (
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
			)}
		</>
	);
}
