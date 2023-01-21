import { useState } from "react";
import {
	Delete as DeleteIcon,
	DragHandle as DragHandleIcon,
	HighlightOff as ClearIcon,
} from "@mui/icons-material";
import {
	Button,
	Card,
	CardContent,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	FormControl,
	FormControlLabel,
	Grid,
	IconButton,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField,
	Tooltip,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { Box } from "@mui/system";
import { Field, FieldProps, useFormikContext } from "formik";
import { Reorder, useDragControls } from "framer-motion";
import { useDebouncedCallback } from "../../utils";
import {
	CombatantInput,
	EncounterDetailDocument,
	PlayerFragment,
	useDeleteCombatantMutation,
} from "../../graphql/client-types";

const StyledTextField = styled(TextField)(({ theme }) => ({
	"& input.Mui-disabled": {
		cursor: "not-allowed",
		color: theme.palette.text.primary,
		textFillColor: theme.palette.text.primary,
	},
}));

const StyledFormControlLabel = styled(FormControlLabel)(({ theme }) => ({
	"& .MuiFormControlLabel-label.Mui-disabled": {
		cursor: "not-allowed",
		color: theme.palette.text.primary,
		textFillColor: theme.palette.text.primary,
	},
}));

interface CombatantEditorProps {
	playerList: PlayerFragment[];
	combatant: CombatantInput;
	index: number;
	onDragEnd: () => void;
}

export default function CombatantEditor({
	playerList,
	combatant,
	index,
	onDragEnd,
}: CombatantEditorProps) {
	const [deleting, setDeleting] = useState(false);
	const dragControls = useDragControls();
	const formik = useFormikContext<{ combatants: CombatantInput[] }>();

	const [deleteCombatant] = useDeleteCombatantMutation({
		variables: {
			id: combatant.id as string,
		},
		refetchQueries: [EncounterDetailDocument],
	});

	const handleQuickSubmit = useDebouncedCallback(
		formik.handleSubmit.bind(formik),
		250
	);

	const handleLongSubmit = useDebouncedCallback(
		formik.handleSubmit.bind(formik),
		500
	);

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
				marginBottom: 16,
				padding: 0,
				position: "relative",
			}}
		>
			<Card>
				<CardContent>
					<Box width={40}>
						<DragHandleIcon
							onPointerDown={(e) => dragControls.start(e)}
							style={{
								cursor: "grab",
								position: "absolute",
								top: "50%",
								left: 8,
								transform: "translateY(-50%)",
							}}
						/>
					</Box>
					<Grid container spacing={2} alignItems="center" ml={2} pr={6} mb={-1}>
						<Grid item xs={12} md={5}>
							<Field name={`combatants[${index}].name`}>
								{({
									field,
									form,
									meta,
								}: FieldProps<string, { combatants: CombatantInput[] }>) => {
									const disabled =
										!!form.values.combatants[index]?.playerId ||
										form.isSubmitting;
									return (
										<Tooltip
											title={
												disabled ? "Controlled by Player Preset" : undefined
											}
											placement="top"
											followCursor
										>
											<span>
												<StyledTextField
													required
													id={`combatants[${index}].name`}
													label="Name"
													fullWidth
													autoFocus
													disabled={disabled}
													error={meta.touched && !!meta.error}
													helperText={meta.touched ? meta.error : undefined}
													{...field}
													onChange={(e) => {
														field.onChange(e);
														handleLongSubmit();
													}}
												/>
											</span>
										</Tooltip>
									);
								}}
							</Field>
						</Grid>
						<Grid item xs={8} md={5}>
							<Field name={`combatants[${index}].playerId`}>
								{({
									field,
									form,
								}: FieldProps<string, { combatants: CombatantInput[] }>) => {
									const selectedPlayer = playerList.find(
										(p) => p.id === field.value
									);
									const filteredPlayerList = playerList.filter(
										(player) =>
											selectedPlayer?.id === player.id ||
											!form.values.combatants
												.map((c) => c.playerId)
												.includes(player.id)
									);
									return (
										<FormControl fullWidth>
											<InputLabel id={`combatants[${index}].playerId`}>
												Player Preset{" "}
												{!filteredPlayerList.length
													? "(No Players Available)"
													: ""}
											</InputLabel>
											<Select
												labelId="playerIdLabel"
												id={`combatants[${index}].playerId`}
												label="Player Preset"
												disabled={
													!filteredPlayerList.length || form.isSubmitting
												}
												{...field}
												endAdornment={
													<ClearIcon
														sx={{
															color: "grey.800",
															marginRight: 2,
															cursor: "pointer",
															display: field.value ? "" : "none",
														}}
														onClick={() => {
															form.setFieldValue(
																`combatants[${index}].playerId`,
																undefined
															);
															handleQuickSubmit();
														}}
													/>
												}
												onChange={(e) => {
													const newPlayer = playerList.find(
														(p) => p.id === e.target.value
													) as PlayerFragment;
													field.onChange(e);
													form.setFieldValue(
														`combatants[${index}].name`,
														newPlayer.characterName
													);
													form.setFieldValue(
														`combatants[${index}].public`,
														true
													);
													handleQuickSubmit();
												}}
											>
												{filteredPlayerList.map((player) => (
													<MenuItem
														key={`${index}_${player.id}`}
														value={player.id}
													>
														{player.playerName}
													</MenuItem>
												))}
											</Select>
										</FormControl>
									);
								}}
							</Field>
						</Grid>
						<Grid
							item
							xs={2}
							md={1}
							sx={{ display: "flex", justifyContent: "center" }}
						>
							<Field name={`combatants[${index}].public`}>
								{({
									field,
									form,
								}: FieldProps<boolean, { combatants: CombatantInput[] }>) => {
									const disabled =
										!!form.values.combatants[index]?.playerId ||
										form.isSubmitting;
									return (
										<Tooltip
											title={
												disabled ? "Controlled by Player Preset" : undefined
											}
											placement="top"
											followCursor
										>
											<span>
												<StyledFormControlLabel
													id={`combatants[${index}].public`}
													label="Public"
													labelPlacement="start"
													control={
														<Switch
															color="primary"
															checked={field.value}
															disabled={disabled}
															sx={{
																cursor: disabled ? "not-allowed" : "default",
															}}
															{...field}
															onChange={(e) => {
																field.onChange(e);
																handleQuickSubmit();
															}}
														/>
													}
												/>
											</span>
										</Tooltip>
									);
								}}
							</Field>
						</Grid>
						<Grid
							item
							xs={2}
							md={1}
							sx={{ display: "flex", justifyContent: "flex-end" }}
						>
							<IconButton onClick={() => setDeleting(true)}>
								<DeleteIcon />
							</IconButton>
						</Grid>
					</Grid>
				</CardContent>
			</Card>
			<Dialog open={deleting} onClose={() => setDeleting(false)}>
				<DialogTitle>Delete combatant {combatant.name}?</DialogTitle>
				<DialogContent>
					<DialogContentText>This action cannot be undone.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={() => setDeleting(false)}>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							deleteCombatant();
							setDeleting(false);
						}}
						color="error"
					>
						<DeleteIcon /> Delete
					</Button>
				</DialogActions>
			</Dialog>
		</Reorder.Item>
	);
}
