import { useCallback, useMemo } from "react";
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
import InitiativeList from "../../../components/initiative-list/initiative-list";
import {
	useAdvanceInitiativeMutation,
	useCampaignSubscription,
} from "../../../graphql/client-types";

export default function RunInitiative() {
	const router = useRouter();
	const { campaignId } = router.query;
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	const campaign = useMemo(() => data?.campaign, [data]);

	const [advanceInitiative, { loading }] = useAdvanceInitiativeMutation();

	const next = useCallback(
		() =>
			advanceInitiative({
				variables: {
					campaignId: campaign?.id as string,
					encounterId: campaign?.activeEncounter?.id as string,
					forward: true,
				},
			}),
		[advanceInitiative, campaign]
	);
	const prev = useCallback(
		() =>
			advanceInitiative({
				variables: {
					campaignId: campaign?.id as string,
					encounterId: campaign?.activeEncounter?.id as string,
					forward: false,
				},
			}),
		[advanceInitiative, campaign]
	);

	return (
		campaign &&
		campaign.activeEncounter && (
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
								{campaign.name}
							</MUILink>
						</Link>
						<Link href={`/${campaignId}/encounter`}>
							<MUILink component="a" underline="hover" color="inherit">
								Encounters
							</MUILink>
						</Link>
						<Link
							href={`/${campaignId}/encounter/${campaign.activeEncounter.id}/edit`}
						>
							<MUILink component="a" underline="hover" color="inherit">
								{campaign.activeEncounter.name}
							</MUILink>
						</Link>
						<Typography color="text.primary">Run Initiative</Typography>
					</Breadcrumbs>
					<Typography variant="h3" mb={2}>
						{campaign.activeEncounter.name}
					</Typography>
					<InitiativeList
						campaign={campaign}
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
							disabled={loading || campaign.activeEncounter.round === 0}
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
