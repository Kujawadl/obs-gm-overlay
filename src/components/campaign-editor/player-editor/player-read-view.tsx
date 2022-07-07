import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Grid,
	IconButton,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Edit as EditIcon,
	Remove as RemoveIcon,
} from "@mui/icons-material";
import {
	ChangeEvent,
	Dispatch,
	SetStateAction,
	useCallback,
	useState,
} from "react";
import {
	PlayerFragment,
	useDeletePlayerMutation,
	useSetPlayerInspirationMutation,
} from "../../../graphql";

interface PlayerReadViewProps {
	player: PlayerFragment;
	gmInspiration: boolean;
	setEditing: Dispatch<SetStateAction<boolean>>;
}

export default function PlayerReadView({
	player,
	gmInspiration,
	setEditing,
}: PlayerReadViewProps) {
	const [open, setOpen] = useState(false);
	const [setInspiration] = useSetPlayerInspirationMutation();
	const [deletePlayer] = useDeletePlayerMutation({
		variables: { id: player.id },
	});
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.only("xs"));

	const onSetInspiration = useCallback(
		(event: ChangeEvent<HTMLInputElement>) => {
			setInspiration({
				variables: {
					id: player.id,
					inspiration: event.target.value
						? Math.max(parseInt(event.target.value, 10), 0)
						: 0,
				},
			});
		},
		[player.id, setInspiration]
	);

	const onIncrement = useCallback(() => {
		setInspiration({
			variables: {
				id: player.id,
				inspiration: player.inspiration + 1,
			},
		});
	}, [player.id, player.inspiration, setInspiration]);

	const onDecrement = useCallback(() => {
		setInspiration({
			variables: {
				id: player.id,
				inspiration: Math.max(player.inspiration - 1, 0),
			},
		});
	}, [player.id, player.inspiration, setInspiration]);

	return (
		<>
			<Grid container alignItems="center">
				<Grid item xs={8}>
					<Box component="span" sx={{ fontWeight: "bold", paddingRight: 1 }}>
						{player.playerName}
					</Box>
					{!isMobileView && (player.characterName || player.isGM) && (
						<Box component="span" sx={{ color: "text.secondary" }}>
							({player.isGM ? "GM" : player.characterName})
						</Box>
					)}
				</Grid>
				<Grid
					item
					xs={4}
					sx={{
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					<IconButton
						onClick={onDecrement}
						sx={{
							visibility: gmInspiration || !player.isGM ? "visible" : "hidden",
						}}
					>
						<RemoveIcon />
					</IconButton>
					<TextField
						inputProps={{
							inputMode: "numeric",
							pattern: "[0-9]*",
							style: { textAlign: "center" },
						}}
						size="small"
						sx={{
							minWidth: 50,
							maxWidth: 50,
							visibility: gmInspiration || !player.isGM ? "visible" : "hidden",
						}}
						value={player.inspiration}
						onChange={onSetInspiration}
					/>
					<IconButton
						onClick={onIncrement}
						sx={{
							visibility: gmInspiration || !player.isGM ? "visible" : "hidden",
						}}
					>
						<AddIcon />
					</IconButton>
					<IconButton onClick={() => setEditing(true)}>
						<EditIcon />
					</IconButton>
					<IconButton onClick={() => setOpen(true)}>
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
			<Dialog open={open} onClose={() => setOpen(false)}>
				<DialogTitle>
					Delete player {player.playerName} from this campaign?
				</DialogTitle>
				<DialogContent>
					<DialogContentText>This action cannot be undone.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={() => setOpen(false)}>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							deletePlayer();
							setOpen(false);
						}}
						color="error"
					>
						<DeleteIcon /> Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
