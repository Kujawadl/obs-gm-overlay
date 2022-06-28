import { useState } from "react";
import PlayerEditView from "./player-edit-view";
import PlayerReadView from "./player-read-view";

interface PlayerEditorProps {
  player: {
    id?: string;
    playerName: string;
    characterName?: string;
    isGM: boolean;
    inspiration: number;
  };
  campaignId: string | number;
  gmInspiration: boolean;
}

export default function PlayerEditor({
  player,
  campaignId,
  gmInspiration,
}: PlayerEditorProps) {
  const [editing, setEditing] = useState(false);

  return editing ? (
    <PlayerEditView
      player={player}
      campaignId={campaignId}
      setEditing={setEditing}
    />
  ) : (
    <PlayerReadView
      player={player}
      gmInspiration={gmInspiration}
      setEditing={setEditing}
    />
  );
}
