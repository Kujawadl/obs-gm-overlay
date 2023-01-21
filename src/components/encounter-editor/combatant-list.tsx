import { useCallback, useMemo } from "react";
import { Formik } from "formik";
import { Backdrop, Box, Button, CircularProgress } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { Reorder } from "framer-motion";
import clone from "lodash/clone";
import maxBy from "lodash/maxBy";
import omit from "lodash/omit";
import {
	CombatantFragment,
	CombatantInput,
	EncounterDetailDocument,
	useCampaignSubscription,
	useSaveCombatantMutation,
	useSaveCombatantsMutation,
} from "../../graphql/client-types";
import CombatantEditor from "./combatant-editor";

interface CombatantListProps {
	campaignId: string;
	encounterId: string;
	combatants: CombatantFragment[];
}

export default function CombatantList({
	campaignId,
	encounterId,
	combatants,
}: CombatantListProps) {
	const { data: campaignData } = useCampaignSubscription({
		variables: { id: campaignId },
	});

	const [addCombatant] = useSaveCombatantMutation({
		variables: {
			combatant: {
				campaignId,
				encounterId,
				name: "New Combatant",
				turnOrder: (maxBy(combatants, "turnOrder")?.turnOrder ?? 0) + 1,
			},
		},
		refetchQueries: [EncounterDetailDocument],
	});
	const [saveCombatants] = useSaveCombatantsMutation({
		refetchQueries: [EncounterDetailDocument],
	});

	const initialValues = useMemo(
		() => ({
			combatants: combatants.map(
				(combatant) =>
					({
						...omit(combatant, "__typename", "player"),
						campaignId,
						encounterId,
						playerId: combatant.player?.id,
					} as CombatantInput)
			),
		}),
		[combatants, campaignId, encounterId]
	);

	const playerList = useMemo(
		() =>
			(campaignData?.campaign?.players ?? []).filter((player) => !player.isGM),
		[campaignData]
	);

	const onSubmit = useCallback(
		(values: typeof initialValues) => {
			const newValues = values.combatants.map((combatant, i) => ({
				...combatant,
				turnOrder: i + 1,
			}));
			saveCombatants({
				variables: {
					combatants: newValues,
				},
			});
		},
		[saveCombatants]
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onSubmit}
			enableReinitialize
		>
			{(form) => {
				const ids = form.values.combatants.map((combatant) => combatant.id);
				const onReorder = (ids: string[]) => {
					form.setValues({
						combatants: ids.map((id, i) => {
							const combatant = clone(
								form.values.combatants.find(
									(c) => c.id === id
								) as CombatantInput
							);
							combatant.turnOrder = i + 1;
							return combatant;
						}),
					});
				};
				return (
					<>
						<Backdrop
							sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
							open={form.isSubmitting}
						>
							<CircularProgress color="inherit" />
						</Backdrop>
						<Reorder.Group
							axis="y"
							values={ids}
							onReorder={onReorder}
							style={{ padding: 0 }}
						>
							{form.values.combatants.map((combatant, index) => (
								<CombatantEditor
									key={combatant.id}
									playerList={playerList}
									combatant={combatant}
									index={index}
									onDragEnd={form.submitForm}
								/>
							))}
						</Reorder.Group>
						<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
							<Button
								variant="contained"
								color="success"
								onClick={() => addCombatant()}
							>
								<AddIcon /> New Combatant
							</Button>
						</Box>
					</>
				);
			}}
		</Formik>
	);
}
