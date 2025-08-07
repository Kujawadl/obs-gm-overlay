import { Formik, Field, Form, FieldProps, FormikProps } from "formik";
import {
	FormControl,
	FormControlLabel,
	Grid,
	InputLabel,
	MenuItem,
	Select,
	Switch,
	TextField,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import * as Yup from "yup";
import PlayerList from "@src/components/campaign-editor/player-list";
import {
	CampaignFragment,
	CooldownType,
	useSaveCampaignMutation,
} from "@graphql/client-types";
import { useFormikAutoSubmit } from "@utils/useFormikAutoSubmit";

const validationSchema = Yup.object().shape({
	name: Yup.string().required("Campaign Name is required"),
});

interface CampaignEditorProps {
	campaign: CampaignFragment;
}

interface CampaignEditorFormValues {
	name: string;
	gmInspiration: boolean;
	cooldownType: CooldownType;
	cooldownTime: string;
}

export default function CampaignEditor({ campaign }: CampaignEditorProps) {
	const [updateCampaign] = useSaveCampaignMutation();

	const initialValues = useMemo(
		() => ({
			name: campaign.name,
			gmInspiration: campaign.gmInspiration,
			cooldownType: campaign.cooldownType,
			cooldownTime: campaign.cooldownTime?.toString(),
		}),
		[campaign],
	);

	const onUpdateCampaign = useCallback(
		async (values: typeof initialValues) => {
			updateCampaign({
				variables: {
					id: campaign.id,
					input: {
						name: values.name,
						gmInspiration: values.gmInspiration,
						cooldownType: values.cooldownType,
						cooldownTime: parseInt(values.cooldownTime, 10),
					},
				},
			});
		},
		[campaign.id, updateCampaign],
	);

	return (
		<>
			<Formik<CampaignEditorFormValues>
				initialValues={initialValues}
				enableReinitialize
				validationSchema={validationSchema}
				onSubmit={onUpdateCampaign}
			>
				{(formik) => <CampaignEditorForm formik={formik} />}
			</Formik>
			<PlayerList campaign={campaign} />
		</>
	);
}

interface CampaignEditorFormProps {
	formik: FormikProps<CampaignEditorFormValues>;
}
function CampaignEditorForm({ formik }: CampaignEditorFormProps) {
	useFormikAutoSubmit(formik, 100);
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.only("xs"));

	return (
		<Form>
			<Grid container spacing={2} my={2}>
				<Grid size={{ xs: 12, sm: 8 }}>
					<Field name="name">
						{({ field, meta }: FieldProps<string>) => (
							<TextField
								required
								id="name"
								label="Campaign Name"
								fullWidth
								error={meta.touched && !!meta.error}
								helperText={meta.error}
								{...field}
							/>
						)}
					</Field>
				</Grid>
				<Grid
					size={{ xs: 12, sm: 4 }}
					sx={{
						textAlign: "right",
						mt: 1,
						order: isMobileView ? "1" : undefined,
					}}
				>
					<Field name="gmInspiration">
						{({ field, form }: FieldProps<boolean>) => (
							<FormControlLabel
								id="gmInspiration"
								label="GM Gets Inspiration"
								labelPlacement={"start"}
								control={
									<Switch
										color="primary"
										checked={field.value}
										onFocus={() => form.setFieldTouched(field.name)}
										{...field}
									/>
								}
							/>
						)}
					</Field>
				</Grid>
				<Grid size={{ xs: 12, sm: 6 }}>
					<Field name="cooldownType">
						{({ field }: FieldProps<boolean>) => (
							<FormControl fullWidth>
								<InputLabel id="cooldownTypeLabel">Cooldown Type</InputLabel>
								<Select
									labelId="cooldownTypeLabel"
									id="cooldownType"
									label="Cooldown Type"
									{...field}
								>
									<MenuItem value="none">None</MenuItem>
									<MenuItem value="player">Per-Player</MenuItem>
									<MenuItem value="table">Entire Table</MenuItem>
								</Select>
							</FormControl>
						)}
					</Field>
				</Grid>
				<Grid size={{ xs: 12, sm: 6 }}>
					<Field name="cooldownTime">
						{({ field }: FieldProps<boolean>) => (
							<TextField
								id="cooldownTime"
								label="Cooldown Time (Minutes)"
								fullWidth
								inputProps={{
									inputMode: "numeric",
									pattern: "[0-9]*",
								}}
								{...field}
								onChange={(e) => {
									e.target.value = (
										parseInt(e.target.value, 10) || 0
									).toString();
									field.onChange(e);
								}}
							/>
						)}
					</Field>
				</Grid>
			</Grid>
		</Form>
	);
}
