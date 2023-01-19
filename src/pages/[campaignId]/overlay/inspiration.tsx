import { useRouter } from "next/router";
import { Box } from "@mui/material";
import Head from "next/head";
import Badge from "../../../components/badge";
import {
	CampaignFragment,
	useCampaignSubscription,
} from "../../../graphql/client-types";

export default function Inspiration() {
	const router = useRouter();
	const { campaignId } = router.query;
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	return (
		<>
			<Head>
				<title>{`${
					data?.campaign?.name ?? "Campaign"
				} Inspiration | OBS GM Overlay`}</title>
			</Head>
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
					) : null
				)}
			</Box>
		</>
	);
}
