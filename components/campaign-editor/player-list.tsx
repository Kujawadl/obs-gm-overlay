import { Box, List, ListItem, Typography } from "@mui/material";
import PlayerEditor from "./player-editor";

interface PlayerListProps {
  players: {
    id?: string;
    playerName: string;
    characterName?: string;
    isGM: boolean;
    inspiration: number;
  }[];
  campaignId: string | number;
  gmInspiration: boolean;
}

export default function PlayerList({
  players,
  campaignId,
  gmInspiration,
}: PlayerListProps) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "baseline",
        }}
      >
        <Typography variant="h4">Players</Typography>
        <Typography variant="h5" color="text.secondary">
          Inspiration Tracker
        </Typography>
      </Box>
      <List
        sx={{
          marginTop: 2,
          paddingTop: 0,
          border: 0,
          borderTop: 2,
          borderStyle: "solid",
          borderColor: "primary.light",
        }}
      >
        {players.map((player) => (
          <ListItem
            key={player.id}
            sx={{
              border: 0,
              borderBottom: 1,
              borderStyle: "solid",
              borderColor: "grey.400",
              marginTop: 1,
              marginBottom: 1,
            }}
          >
            <PlayerEditor
              player={player}
              campaignId={campaignId}
              gmInspiration={gmInspiration}
            />
          </ListItem>
        ))}
      </List>
    </>
  );
}
