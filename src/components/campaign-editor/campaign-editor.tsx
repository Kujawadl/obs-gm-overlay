import { gql, useMutation } from "@apollo/client";
import { Formik, Field, Form, FieldProps } from "formik";
import {
  Button,
  FormControlLabel,
  Grid,
  Switch,
  TextField,
  Typography,
} from "@mui/material";
import { useCallback, useMemo } from "react";
import * as Yup from "yup";
import PlayerList from "./player-list";

const UPDATE_CAMPAIGN = gql`
  fragment PlayerFragment on Player {
    id
    playerName
    characterName
    isGM
    inspiration
  }

  fragment CampaignFragment on Campaign {
    id
    name
    gmInspiration
    players {
      ...PlayerFragment
    }
  }

  mutation UPDATE_CAMPAIGN($id: ID, $input: CampaignInput!) {
    campaign(id: $id) {
      save(input: $input) {
        ...CampaignFragment
      }
    }
  }
`;

const validationSchema = Yup.object().shape({
  name: Yup.string().required("Campaign Name is required"),
});

interface CampaignEditorProps {
  campaign: {
    id: string;
    name: string;
    gmInspiration: boolean;
    players: {
      id: string;
      playerName: string;
      characterName?: string;
      isGM: boolean;
      inspiration: number;
    }[];
  };
}

export default function CampaignEditor({ campaign }: CampaignEditorProps) {
  const [updateCampaign] = useMutation(UPDATE_CAMPAIGN);

  const initialValues = useMemo(
    () => ({
      name: campaign.name,
      gmInspiration: campaign.gmInspiration,
    }),
    [campaign]
  );

  const onUpdateCampaign = useCallback(
    async (values: Pick<typeof campaign, "name" | "gmInspiration">) => {
      updateCampaign({
        variables: {
          id: campaign.id,
          input: {
            name: values.name,
            gmInspiration: values.gmInspiration,
          },
        },
      });
    },
    [campaign.id, updateCampaign]
  );

  return (
    <>
      <Typography variant="h3">Edit Campaign</Typography>
      <Formik
        initialValues={initialValues}
        enableReinitialize
        validationSchema={validationSchema}
        onSubmit={onUpdateCampaign}
      >
        {({ handleReset, isValid, dirty }) => (
          <Form>
            <Grid container spacing={2} my={2}>
              <Grid item xs={12} sm={6}>
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
              <Grid item xs={12} sm={6} sx={{ textAlign: "right", mt: 1 }}>
                <Field name="gmInspiration">
                  {({ field, form }: FieldProps<boolean>) => (
                    <FormControlLabel
                      id="gmInspiration"
                      label="GM Gets Inspiration"
                      labelPlacement="start"
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
              {dirty && (
                <Grid item xs={12} sx={{ textAlign: "right" }}>
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
      <PlayerList
        players={campaign.players || []}
        campaignId={campaign.id}
        gmInspiration={campaign.gmInspiration}
      />
    </>
  );
}
