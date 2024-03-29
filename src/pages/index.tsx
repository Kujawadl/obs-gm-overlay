import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import CampaignList from "../components/campaign-list";
import {
	useListCampaignsQuery,
	useSaveCampaignMutation,
} from "../graphql/client-types";

export default function Home() {
	const { data, refetch } = useListCampaignsQuery();
	const [addCampaign] = useSaveCampaignMutation();
	const router = useRouter();

	const onAddCampaign = useCallback(() => {
		addCampaign({
			variables: {
				input: {
					name: "New Campaign",
					gmInspiration: false,
				},
			},
		}).then(({ data }) => {
			if (data?.campaign) {
				router.push(`/${data.campaign.save.id}/edit`);
			} else {
				// TODO: Display an error here
			}
			refetch();
		});
	}, [addCampaign, router, refetch]);

	return data ? (
		<>
			<Head>
				<title>List Campaigns | OBS GM Overlay</title>
			</Head>
			<Container fixed>
				<Typography variant="h3">Campaigns</Typography>
				<CampaignList campaigns={data.campaigns} refetch={refetch} />
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button variant="contained" color="success" onClick={onAddCampaign}>
						<AddIcon /> New Campaign
					</Button>
				</Box>
			</Container>
		</>
	) : null;
}
