import { useState } from "react";
import {
	CampaignFragment,
	PlayerFragment,
} from "../../../graphql/client-types";
import PlayerEditView from "./player-edit-view";
import PlayerReadView from "./player-read-view";

interface PlayerEditorProps {
	player?: PlayerFragment;
	campaign: CampaignFragment;
	onCancelAdd: () => void;
}

export default function PlayerEditor({
	player,
	campaign,
	onCancelAdd,
}: PlayerEditorProps) {
	const [editing, setEditing] = useState(false);

	return editing || !player ? (
		<PlayerEditView
			player={player}
			campaignId={campaign.id}
			setEditing={setEditing}
			onCancelAdd={onCancelAdd}
		/>
	) : (
		<PlayerReadView
			player={player}
			campaign={campaign}
			setEditing={setEditing}
		/>
	);
}
