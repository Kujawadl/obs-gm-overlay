import { useState } from "react";
import { PlayerFragment } from "../../../graphql";
import PlayerEditView from "./player-edit-view";
import PlayerReadView from "./player-read-view";

interface PlayerEditorProps {
	player?: PlayerFragment;
	campaignId: string;
	gmInspiration: boolean;
	onCancelAdd: () => void;
}

export default function PlayerEditor({
	player,
	campaignId,
	gmInspiration,
	onCancelAdd,
}: PlayerEditorProps) {
	const [editing, setEditing] = useState(false);

	return editing || !player ? (
		<PlayerEditView
			player={player}
			campaignId={campaignId}
			setEditing={setEditing}
			onCancelAdd={onCancelAdd}
		/>
	) : (
		<PlayerReadView
			player={player}
			gmInspiration={gmInspiration}
			setEditing={setEditing}
		/>
	);
}
