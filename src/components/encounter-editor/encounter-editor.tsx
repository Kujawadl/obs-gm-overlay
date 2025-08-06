import { Formik, Field, Form, FieldProps } from "formik";
import {
	Button,
	FormControl,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	TextField,
	Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import * as Yup from "yup";
import CombatantList from "@src/components/encounter-editor/combatant-list";
import {
	CampaignFragment,
	EncounterFragment,
	HideMonsterNames,
	useSaveEncounterMutation,
} from "@graphql/client-types";

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Campaign Name is required"),
});

interface EncounterEditorProps {
	campaign: CampaignFragment;
	encounter: EncounterFragment;
}

export default function EncounterEditor({
	campaign,
	encounter,
}: EncounterEditorProps) {
	const [updateEncounter] = useSaveEncounterMutation();

	const initialValues = useMemo(
		() => ({
			name: encounter.name,
			hideMonsterNames: encounter.hideMonsterNames,
		}),
		[encounter.name, encounter.hideMonsterNames],
	);

	const onUpdateCampaign = useCallback(
		async (values: typeof initialValues) => {
			updateEncounter({
				variables: {
					encounter: {
						id: encounter.id,
						name: values.name,
						campaignId: campaign.id,
						hideMonsterNames: values.hideMonsterNames,
					},
				},
			});
		},
		[encounter.id, campaign.id, updateEncounter],
	);

	return (
		<>
			<Typography variant="h3">Edit Encounter</Typography>
			<Formik
				initialValues={initialValues}
				enableReinitialize
				validationSchema={validationSchema}
				onSubmit={onUpdateCampaign}
			>
				{({ handleReset, isValid, dirty }) => (
					<Form>
						<Grid container spacing={2} my={2}>
							<Grid size={{ xs: 12, sm: 8 }}>
								<Field name="name">
									{({ field, meta }: FieldProps<string>) => (
										<TextField
											required
											id="name"
											label="Encounter Name"
											fullWidth
											error={meta.touched && !!meta.error}
											helperText={meta.error}
											{...field}
										/>
									)}
								</Field>
							</Grid>

							<Grid size={{ xs: 12, sm: 4 }}>
								<Field name="hideMonsterNames">
									{({ field }: FieldProps<HideMonsterNames>) => (
										<FormControl fullWidth>
											<InputLabel id="hideMonsterNames">
												Hide Monster Names
											</InputLabel>
											<Select
												labelId="hideMonsterNamesLabel"
												id="hideMonsterNames"
												label="Hide Monster Names"
												{...field}
											>
												<MenuItem value={HideMonsterNames.Never}>
													Never
												</MenuItem>
												<MenuItem value={HideMonsterNames.UntilTurn}>
													Until Their Turn
												</MenuItem>
												<MenuItem value={HideMonsterNames.Always}>
													Always
												</MenuItem>
											</Select>
										</FormControl>
									)}
								</Field>
							</Grid>
							{dirty && (
								<Grid size={{ xs: 12 }} sx={{ textAlign: "right", order: "2" }}>
									<Button
										variant="contained"
										color="secondary"
										onClick={handleReset}
										sx={{ mr: 2 }}
									>
										Reset
									</Button>
									<Button
										variant="contained"
										color="primary"
										disabled={!isValid}
										type="submit"
									>
										Save
									</Button>
								</Grid>
							)}
						</Grid>
					</Form>
				)}
			</Formik>
			<CombatantList
				campaignId={campaign.id}
				encounterId={encounter.id}
				combatants={encounter.combatants}
			/>
		</>
	);
}
