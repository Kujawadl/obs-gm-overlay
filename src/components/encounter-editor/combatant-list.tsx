import { useCallback, useMemo, useState } from "react";
import { useDebounce } from "react-use";
import omit from "lodash/omit";
import { Reorder } from "framer-motion";
import {
	CombatantFragment,
	useSaveCombatantMutation,
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
	combatants: initialCombatants,
}: CombatantListProps) {
	const [combatants, setCombatants] = useState(initialCombatants);
	const [saveCombatant] = useSaveCombatantMutation();

	const ids = useMemo(() => combatants.map(({ id }) => id), [combatants]);

	useDebounce(
		() => {
			setCombatants(initialCombatants);
		},
		1000,
		[initialCombatants]
	);

	const onReorder = useCallback(
		(ids: string[]) => {
			setCombatants(
				ids.map(
					(id) =>
						initialCombatants.find(
							(combatant) => combatant.id === id
						) as CombatantFragment
				)
			);
		},
		[initialCombatants]
	);

	const onDragEnd = useCallback(() => {
		combatants.forEach(({ id }, i) => {
			const combatant = combatants.find((combatant) => combatant.id === id);
			if (combatant && combatant.turnOrder !== i + 1) {
				// TODO: Maybe make a new mutation that sets all orders at once in a transaction?
				saveCombatant({
					variables: {
						combatant: {
							...omit(combatant, "__typename", "player"),
							campaignId,
							encounterId,
							turnOrder: i + 1,
						},
					},
					optimisticResponse: {
						campaign: {
							encounter: {
								combatant: {
									save: {
										...combatant,
										turnOrder: i + 1,
									},
								},
							},
						},
					},
				});
			}
		});
	}, [combatants, campaignId, encounterId, saveCombatant]);

	return (
		<Reorder.Group
			axis="y"
			values={ids}
			onReorder={onReorder}
			style={{ padding: 0 }}
		>
			{combatants.map((combatant) => (
				<CombatantEditor
					key={combatant.id}
					combatant={combatant}
					onDragEnd={onDragEnd}
				/>
			))}
		</Reorder.Group>
	);
}
