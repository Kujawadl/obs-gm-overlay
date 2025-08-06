import { useCallback, useMemo } from "react";
import { Box, Button, Container, Typography } from "@mui/material";
import {
	ArrowBackIos as ArrowBackIcon,
	ArrowForwardIos as ArrowForwardIcon,
	History as HistoryIcon,
} from "@mui/icons-material";
import omit from "lodash/omit";
import { useParams } from "react-router-dom";
import InitiativeList from "@src/components/initiative-list/initiative-list";
import {
	EncounterDetailDocument,
	useAdvanceInitiativeMutation,
	useCampaignSubscription,
	useSaveEncounterMutation,
} from "@graphql/client-types";

export default function RunInitiative() {
	const { campaignId } = useParams();
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	const campaign = useMemo(() => data?.campaign, [data]);

	const [advanceInitiative, { loading }] = useAdvanceInitiativeMutation();

	const [resetInitiative] = useSaveEncounterMutation({
		variables: {
			encounter: {
				...omit(campaign?.activeEncounter, "__typename", "combatants"),
				campaignId: campaignId as string,
				round: 0,
				turn: 0,
				turnStart: null,
			},
		},
		refetchQueries: [EncounterDetailDocument],
	});

	const next = useCallback(
		() =>
			advanceInitiative({
				variables: {
					campaignId: campaign?.id as string,
					encounterId: campaign?.activeEncounter?.id as string,
					forward: true,
				},
			}),
		[advanceInitiative, campaign],
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
		[advanceInitiative, campaign],
	);

	return (
		campaign &&
		campaign.activeEncounter && (
			<>
				<Container fixed>
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
							disabled={loading || campaign.activeEncounter.round === 0}
							onClick={() => resetInitiative()}
						>
							<HistoryIcon />
							Restart
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
