import { Add as AddIcon } from "@mui/icons-material";
import { Box, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import EncounterList from "../../../components/encounter-list";
import {
	useCampaignSubscription,
	useListEncountersQuery,
	useSaveEncounterMutation,
} from "../../../graphql/client-types";

export default function Encounters() {
	const router = useRouter();
	const { campaignId } = router.query;
	const { data: campaignData } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});
	const { data, refetch } = useListEncountersQuery({
		variables: {
			campaignId: campaignId as string,
		},
		skip: !campaignId,
	});
	const [saveEncounter] = useSaveEncounterMutation();

	const onAddEncounter = useCallback(() => {
		saveEncounter({
			variables: {
				encounter: {
					campaignId: campaignId as string,
					name: "New Encounter",
				},
			},
		}).then(({ data }) => {
			if (data?.campaign?.encounter?.save) {
				router.push(
					`/${campaignId}/encounter/${data.campaign.encounter.save.id}/edit`,
				);
			} else {
				// TODO: Display an error here
			}
			refetch();
		});
	}, [saveEncounter, campaignId, router, refetch]);

	return campaignData?.campaign && data?.campaign?.encounters ? (
		<>
			<Head>
				<title>List Encounters | OBS GM Overlay</title>
			</Head>
			<Container fixed>
				<Typography variant="h3">Encounters</Typography>
				<EncounterList
					campaign={campaignData.campaign}
					encounters={data.campaign.encounters}
					refetch={refetch}
				/>
				<Box sx={{ display: "flex", justifyContent: "end" }}>
					<Button variant="contained" color="success" onClick={onAddEncounter}>
						<AddIcon /> New Encounter
					</Button>
				</Box>
			</Container>
		</>
	) : null;
}
