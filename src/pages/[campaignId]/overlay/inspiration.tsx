import { Box } from "@mui/material";
import { useParams } from "react-router-dom";
import Badge from "@src/components/badge";
import {
	CampaignFragment,
	useCampaignSubscription,
} from "@graphql/client-types";

export default function InspirationOverlay() {
	const { campaignId } = useParams();
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "row",
				justifyContent: "space-around",
			}}
		>
			{data?.campaign?.players.map((player) =>
				data?.campaign?.gmInspiration || !player.isGM ? (
					<Badge
						key={player.id}
						player={player}
						campaign={data.campaign as CampaignFragment}
					/>
				) : null,
			)}
		</Box>
	);
}
