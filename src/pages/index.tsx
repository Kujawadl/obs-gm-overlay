import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router-dom";
import CampaignList from "@src/components/campaign-list/index";
import {
	useListCampaignsQuery,
	useSaveCampaignMutation,
} from "@graphql/client-types";

export default function Home() {
	const { data, refetch } = useListCampaignsQuery();
	const [addCampaign] = useSaveCampaignMutation();
	const navigate = useNavigate();
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
				navigate(`/${data.campaign.save.id}/edit`);
			} else {
				// TODO: Display an error here
			}
			refetch();
		});
	}, [addCampaign, navigate, refetch]);

	return data ? (
		<Container fixed>
			<Typography variant="h3">Campaigns</Typography>
			<CampaignList campaigns={data.campaigns} refetch={refetch} />
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button variant="contained" color="success" onClick={onAddCampaign}>
					<AddIcon /> New Campaign
				</Button>
			</Box>
		</Container>
	) : null;
}
