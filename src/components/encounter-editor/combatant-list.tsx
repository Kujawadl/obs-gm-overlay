import { Formik } from "formik";
import clone from "lodash/clone";
import omit from "lodash/omit";
import { Reorder } from "framer-motion";
import {
	CombatantFragment,
	useSaveCombatantsMutation,
} from "../../graphql/client-types";
import { useDebouncedCallback } from "../../utils";
import CombatantEditor from "./combatant-editor";

interface CombatantListProps {
	campaignId: string;
	encounterId: string;
	combatants: CombatantFragment[];
}

export default function CombatantList({
	campaignId,
	encounterId,
	combatants: initialCombatants,
}: CombatantListProps) {
	const [saveCombatants] = useSaveCombatantsMutation();

	const onSubmit = useDebouncedCallback(
		(values: typeof initialCombatants) => {
			const newValues = values.map((combatant, i) => ({
				...omit(combatant, "__typename", "player"),
				campaignId,
				encounterId,
				turnOrder: i + 1,
			}));
			saveCombatants({
				variables: {
					combatants: newValues,
				},
				optimisticResponse: {
					campaign: {
						encounter: {
							saveCombatants: newValues,
						},
					},
				},
			});
		},
		500,
		[campaignId, encounterId, saveCombatants]
	);

	return (
		<Formik
			initialValues={initialCombatants}
			onSubmit={onSubmit}
			enableReinitialize
		>
			{(form) => {
				const ids = form.values.map((combatant) => combatant.id);
				const onReorder = (ids: string[]) => {
					form.setValues(
						ids.map((id, i) => {
							const combatant = clone(
								form.values.find((c) => c.id === id) as CombatantFragment
							);
							combatant.turnOrder = i + 1;
							return combatant;
						})
					);
				};
				return (
					<Reorder.Group
						axis="y"
						values={ids}
						onReorder={onReorder}
						style={{ padding: 0 }}
					>
						{form.values.map((combatant) => (
							<CombatantEditor
								key={combatant.id}
								combatant={combatant}
								onDragEnd={form.submitForm}
							/>
						))}
					</Reorder.Group>
				);
			}}
		</Formik>
	);
}
