import { useCallback, useEffect } from "react";
import {
	Box,
	Breadcrumbs,
	Button,
	Container,
	Link as MUILink,
	Typography,
} from "@mui/material";
import {
	ArrowBackIos as ArrowBackIcon,
	ArrowForwardIos as ArrowForwardIcon,
} from "@mui/icons-material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import InitiativeList from "../../../../components/initiative-list/initiative-list";
import {
	useAdvanceInitiativeMutation,
	useCampaignSubscription,
	useSetActiveEncounterMutation,
} from "../../../../graphql/client-types";

export default function RunInitiative() {
	const router = useRouter();
	const { campaignId, encounterId } = router.query;
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});
	const [setActive] = useSetActiveEncounterMutation({
		variables: {
			campaignId: campaignId as string,
			encounterId: encounterId as string,
		},
	});
	const [advanceInitiative, { loading }] = useAdvanceInitiativeMutation();

	const next = useCallback(
		() =>
			advanceInitiative({
				variables: {
					campaignId: campaignId as string,
					encounterId: encounterId as string,
					forward: true,
				},
			}),
		[advanceInitiative, campaignId, encounterId]
	);
	const prev = useCallback(
		() =>
			advanceInitiative({
				variables: {
					campaignId: campaignId as string,
					encounterId: encounterId as string,
					forward: false,
				},
			}),
		[advanceInitiative, campaignId, encounterId]
	);

	useEffect(() => {
		if (data?.campaign && data.campaign.activeEncounter?.id !== encounterId) {
			setActive();
		}
	}, [data, encounterId, setActive]);

	return (
		data?.campaign &&
		data?.campaign.activeEncounter &&
		data.campaign.activeEncounter.id === encounterId && (
			<>
				<Head>
					<title>{`${
						data?.campaign?.name ?? "Campaign"
					} Initiative | OBS GM Overlay`}</title>
				</Head>
				<Container fixed>
					<Breadcrumbs aria-label="breadcrumb" sx={{ pt: 4, pb: 2 }}>
						<Link href="/">
							<MUILink component="a" underline="hover" color="inherit">
								Campaigns
							</MUILink>
						</Link>
						<Link href={`/${campaignId}/edit`}>
							<MUILink component="a" underline="hover" color="inherit">
								{data.campaign.name}
							</MUILink>
						</Link>
						<Link href={`/${campaignId}/encounter`}>
							<MUILink component="a" underline="hover" color="inherit">
								Encounters
							</MUILink>
						</Link>
						<Link
							href={`/${campaignId}/encounter/${data.campaign.activeEncounter.id}/edit`}
						>
							<MUILink component="a" underline="hover" color="inherit">
								{data.campaign.activeEncounter.name}
							</MUILink>
						</Link>
						<Typography color="text.primary">Run Initiative</Typography>
					</Breadcrumbs>
					<Typography variant="h3" mb={2}>
						{data.campaign.activeEncounter.name}
					</Typography>
					<InitiativeList
						campaign={data?.campaign}
						style="editor"
						forceShowMonsterNames={true}
					/>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							marginTop: 2,
						}}
					>
						<Button
							variant="contained"
							color="secondary"
							onClick={prev}
							disabled={loading || data.campaign.activeEncounter.round === 0}
						>
							<ArrowBackIcon />
							Previous
						</Button>
						<Button
							variant="contained"
							color="primary"
							onClick={next}
							disabled={loading}
						>
							Next <ArrowForwardIcon />
						</Button>
					</Box>
				</Container>
			</>
		)
	);
}
