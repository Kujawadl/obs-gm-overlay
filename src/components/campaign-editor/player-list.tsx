import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import { useMemo, useState } from "react";
import { CampaignFragment, PlayerFragment } from "../../graphql/client-types";
import PlayerEditor from "./player-editor";

interface PlayerListProps {
	campaign: CampaignFragment;
}

export default function PlayerList({ campaign }: PlayerListProps) {
	const [addingPlayer, setAddingPlayer] = useState(false);
	const allPlayers = useMemo(
		() =>
			addingPlayer
				? (campaign.players as (PlayerFragment | undefined)[]).concat(undefined)
				: campaign.players,
		[addingPlayer, campaign.players],
	);

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
				{allPlayers.map((player) => (
					<ListItem
						key={player?.id || "new-player"}
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
							campaign={campaign}
							onCancelAdd={() => setAddingPlayer(false)}
						/>
					</ListItem>
				))}
			</List>
			{!addingPlayer && (
				<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
					<Button
						variant="contained"
						color="success"
						onClick={() => setAddingPlayer(true)}
					>
						<AddIcon /> New Player
					</Button>
				</Box>
			)}
		</>
	);
}
