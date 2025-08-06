import {
	CircularProgress,
	FormControlLabel,
	Grid,
	Switch,
	TextField,
} from "@mui/material";
import {
	DoNotDisturbAlt as CancelIcon,
	Save as SaveIcon,
} from "@mui/icons-material";
import { Dispatch, SetStateAction, useCallback, useMemo } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";
import ResponsiveButton from "@src/components/responsive-button";
import { PlayerFragment, useSavePlayerMutation } from "@graphql/client-types";

const validationSchema = Yup.object().shape({
	playerName: Yup.string().required("Player Name is required"),
});

interface PlayerEditViewProps {
	player?: PlayerFragment;
	campaignId: string;
	setEditing: Dispatch<SetStateAction<boolean>>;
	onCancelAdd: () => void;
}

export default function PlayerEditView({
	player,
	campaignId,
	setEditing,
	onCancelAdd,
}: PlayerEditViewProps) {
	const [updatePlayer, { loading: updatePlayerLoading }] =
		useSavePlayerMutation();

	const initialValues = useMemo(
		() => ({
			playerName: player?.playerName || "",
			characterName: player?.characterName || "",
			isGM: player?.isGM || false,
		}),
		[player?.playerName, player?.characterName, player?.isGM],
	);

	const onUpdatePlayer = useCallback(
		async (values: typeof initialValues) => {
			updatePlayer({
				variables: {
					id: player?.id,
					input: {
						campaignId,
						...values,
					},
				},
			}).then(() => {
				if (!player) {
					onCancelAdd();
				}
				setEditing(false);
			});
		},
		[player, campaignId, updatePlayer, onCancelAdd, setEditing],
	);

	return (
		<Formik
			initialValues={initialValues}
			onSubmit={onUpdatePlayer}
			validationSchema={validationSchema}
		>
			{({ values, isValid }) => (
				<Form style={{ flexGrow: 1 }}>
					<Grid container spacing={2} alignItems="center" mr={-2}>
						<Grid size={{ xs: 8, md: 3 }}>
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
						<Grid
							size={{ xs: 4, md: 3 }}
							sx={{ display: "flex", justifyContent: "center" }}
						>
							<Field name="isGM">
								{({ field }: FieldProps<boolean>) => (
									<FormControlLabel
										id="isGM"
										label="GM"
										labelPlacement="start"
										control={
											<Switch
												color="primary"
												checked={field.value}
												{...field}
											/>
										}
									/>
								)}
							</Field>
						</Grid>
						<Grid size={{ xs: 8, md: 3 }}>
							<Field name="characterName">
								{({ field }: FieldProps<string>) => (
									<TextField
										id="characterName"
										label="Character Name"
										disabled={values.isGM}
										sx={{ visibility: values.isGM ? "hidden" : undefined }}
										fullWidth
										{...field}
									/>
								)}
							</Field>
						</Grid>
						<Grid
							size={{ xs: 4, md: 3 }}
							sx={{ display: "flex", justifyContent: "flex-end" }}
						>
							<ResponsiveButton
								variant="contained"
								color="secondary"
								sx={{ mr: 1 }}
								onClick={() => {
									if (!player) {
										onCancelAdd();
									}
									setEditing(false);
								}}
								icon={<CancelIcon />}
								text="Cancel"
							/>
							{updatePlayerLoading ? (
								<CircularProgress />
							) : (
								<ResponsiveButton
									type="submit"
									variant="contained"
									color="primary"
									disabled={!isValid || updatePlayerLoading}
									icon={<SaveIcon />}
									text="Save"
								/>
							)}
						</Grid>
					</Grid>
				</Form>
			)}
		</Formik>
	);
}
