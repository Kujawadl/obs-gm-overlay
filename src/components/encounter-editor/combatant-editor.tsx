import { DragHandle as DragHandleIcon } from "@mui/icons-material";
import { Card } from "@mui/material";
import { Reorder, useDragControls } from "framer-motion";
import type { CombatantFragment } from "../../graphql/client-types";

interface CombatantEditorProps {
	combatant: CombatantFragment;
	onDragEnd: () => void;
}

export default function CombatantEditor({
	combatant,
	onDragEnd,
}: CombatantEditorProps) {
	const dragControls = useDragControls();

	return (
		<Reorder.Item
			key={combatant.id}
			value={combatant.id}
			dragListener={false}
			dragControls={dragControls}
			onDragEnd={onDragEnd}
			style={{
				listStyle: "none",
				margin: 0,
				padding: 0,
			}}
		>
			<Card style={{ padding: 8, margin: 8 }}>
				<DragHandleIcon
					onPointerDown={(e) => dragControls.start(e)}
					style={{ cursor: "grab", marginBottom: "-6px" }}
				/>
				{combatant.name}
			</Card>
		</Reorder.Item>
	);
}
