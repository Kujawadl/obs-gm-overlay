import {
	Add as AddIcon,
	Delete as DeleteIcon,
	Remove as RemoveIcon,
	Restore as RestoreIcon,
} from "@mui/icons-material";
import {
	CircularProgress,
	FormControlLabel,
	Grid,
	IconButton,
	Switch,
	TextField,
	Tooltip,
} from "@mui/material";
import {
	Field,
	FieldProps,
	Form,
	Formik,
	FormikHelpers,
	FormikProps,
} from "formik";
import { ChangeEvent, useCallback, useMemo } from "react";
import * as Yup from "yup";
import {
	CampaignFragment,
	PlayerFragment,
	useDeletePlayerMutation,
	useResetPlayerCooldownMutation,
	useSavePlayerMutation,
	useSetPlayerInspirationMutation,
} from "@graphql/client-types";
import { useCooldown } from "@utils/useCooldown";
import { useDebouncedCallback } from "@utils/useDebouncedCallback";
import { useFormikAutoSubmit } from "@utils/useFormikAutoSubmit";

const validationSchema = Yup.object().shape({
	playerName: Yup.string().required("Player Name is required"),
});

interface PlayerEditViewProps {
	player: PlayerFragment;
	campaign: CampaignFragment;
}

interface PlayerFormValues {
	playerName: string;
	characterName: string;
	isGM: boolean;
}

export default function PlayerEditView({
	player,
	campaign,
}: PlayerEditViewProps) {
	const [updatePlayer] = useSavePlayerMutation();

	const initialValues = useMemo(
		() => ({
			playerName: player.playerName || "",
			characterName: player.characterName || "",
			isGM: player.isGM || false,
		}),
		[player.playerName, player.characterName, player.isGM],
	);

	const onUpdatePlayer = useDebouncedCallback(
		async (
			values: typeof initialValues,
			{ validateForm }: FormikHelpers<typeof initialValues>,
		) => {
			const errors = await validateForm();
			if (Object.keys(errors).length > 0) {
				return;
			}
			updatePlayer({
				variables: {
					id: player.id,
					input: {
						campaignId: campaign.id,
						...values,
					},
				},
				optimisticResponse: {
					__typename: "Mutation",
					player: {
						__typename: "PlayerMutation",
						save: {
							id: player.id || "",
							playerName: values.playerName,
							characterName: values.characterName,
							isGM: values.isGM,
							inspiration: player.inspiration || 0,
						},
					},
				},
			});
		},
		200,
		[player, campaign.id, updatePlayer],
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onUpdatePlayer}
			validationSchema={validationSchema}
		>
			{(formik) => (
				<PlayerEditForm formik={formik} player={player} campaign={campaign} />
			)}
		</Formik>
	);
}

interface PlayerEditFormProps {
	formik: FormikProps<PlayerFormValues>;
	player: PlayerFragment;
	campaign: CampaignFragment;
}
function PlayerEditForm({ formik, player, campaign }: PlayerEditFormProps) {
	useFormikAutoSubmit(formik, 200);
	const [setInspiration] = useSetPlayerInspirationMutation();
	const [resetCooldown] = useResetPlayerCooldownMutation({
		variables: { id: player.id },
	});
	const [deletePlayer] = useDeletePlayerMutation();

	const {
		cooldownTimeRemaining,
		percentComplete,
		formattedDuration,
		playerCausingCampaignCooldown,
	} = useCooldown({ player, campaign });

	const onDeletePlayer = useCallback(() => {
		return deletePlayer({
			variables: { id: player.id },
		});
	}, [player, deletePlayer]);

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
		[player.id, setInspiration],
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
		<Form style={{ flexGrow: 1 }}>
			<Grid container spacing={2} alignItems="center" mr={-2}>
				<Grid
					size={{ xs: 1 }}
					sx={{ display: "flex", justifyContent: "center" }}
				>
					<Field name="isGM">
						{({ field }: FieldProps<boolean>) => (
							<FormControlLabel
								id="isGM"
								label="GM"
								labelPlacement="start"
								control={
									<Switch color="primary" checked={field.value} {...field} />
								}
							/>
						)}
					</Field>
				</Grid>
				<Grid size={{ xs: 4 }}>
					<Field name="playerName">
						{({ field, meta }: FieldProps<string>) => (
							<TextField
								required
								id="playerName"
								label="Player Name"
								fullWidth
								autoFocus
								error={meta.touched && !!meta.error}
								helperText={meta.touched ? meta.error : undefined}
								{...field}
							/>
						)}
					</Field>
				</Grid>

				<Grid size={{ xs: 4 }}>
					<Field name="characterName">
						{({ field }: FieldProps<string>) => (
							<TextField
								id="characterName"
								label="Character Name"
								disabled={formik.values.isGM}
								sx={{ visibility: formik.values.isGM ? "hidden" : undefined }}
								fullWidth
								{...field}
							/>
						)}
					</Field>
				</Grid>

				<Grid
					size={{ xs: 2 }}
					sx={{
						display: "flex",
						justifyContent: "flex-end",
					}}
				>
					{cooldownTimeRemaining > 0 ? (
						<>
							{playerCausingCampaignCooldown && (
								<IconButton onClick={() => resetCooldown()}>
									<RestoreIcon />
								</IconButton>
							)}
							<Tooltip title={`${formattedDuration} remaining on cooldown`}>
								<CircularProgress
									variant="determinate"
									size="1.5rem"
									sx={{
										alignSelf: "center",
										textAlign: "center",
										margin: "calc(calc(40px - 1.5rem) / 2)",
										flex: "0 0 auto",
									}}
									value={percentComplete}
								/>
							</Tooltip>
						</>
					) : (
						<IconButton
							onClick={onDecrement}
							sx={{
								visibility:
									campaign.gmInspiration || !player.isGM ? "visible" : "hidden",
							}}
						>
							<RemoveIcon />
						</IconButton>
					)}
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
							visibility:
								campaign.gmInspiration || !player.isGM ? "visible" : "hidden",
						}}
						value={player.inspiration}
						onChange={onSetInspiration}
					/>
					<IconButton
						onClick={onIncrement}
						sx={{
							visibility:
								campaign.gmInspiration || !player.isGM ? "visible" : "hidden",
						}}
					>
						<AddIcon />
					</IconButton>
				</Grid>

				<Grid size={{ xs: 1 }}>
					<IconButton onClick={onDeletePlayer}>
						<DeleteIcon />
					</IconButton>
				</Grid>
			</Grid>
		</Form>
	);
}
