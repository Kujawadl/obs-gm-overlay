import { Box, Button, List, ListItem, Typography } from "@mui/material";
import { Add as AddIcon } from "@mui/icons-material";
import PlayerEditor from "@src/components/campaign-editor/player-editor";
import { CampaignFragment, useSavePlayerMutation } from "@graphql/client-types";

interface PlayerListProps {
	campaign: CampaignFragment;
}

export default function PlayerList({ campaign }: PlayerListProps) {
	const [addPlayer] = useSavePlayerMutation({
		variables: {
			input: {
				campaignId: campaign.id,
				isGM: false,
				playerName: "New Player",
				inspiration: 0,
			},
		},
	});
	const allPlayers = campaign.players;

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
						<PlayerEditor player={player} campaign={campaign} />
					</ListItem>
				))}
			</List>
			<Box sx={{ display: "flex", justifyContent: "flex-end" }}>
				<Button variant="contained" color="success" onClick={() => addPlayer()}>
					<AddIcon /> New Player
				</Button>
			</Box>
		</>
	);
}
