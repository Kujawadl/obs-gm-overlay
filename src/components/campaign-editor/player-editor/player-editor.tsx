import { useState } from "react";
import PlayerEditView from "@src/components/campaign-editor/player-editor/player-edit-view";
import PlayerReadView from "@src/components/campaign-editor/player-editor/player-read-view";
import { CampaignFragment, PlayerFragment } from "@graphql/client-types";

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
