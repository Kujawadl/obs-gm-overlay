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
import { useMemo } from "react";
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
  const [saveCampaignData] = useMutation(UPDATE_CAMPAIGN);

  const initialValues = useMemo(
    () => ({
      name: campaign.name,
      gmInspiration: campaign.gmInspiration,
    }),
    [campaign]
  );

  return (
    <>
      <Typography variant="h3">Edit Campaign</Typography>
      <Formik
        initialValues={initialValues}
        onSubmit={async (values) => {
          saveCampaignData({
            variables: {
              id: campaign.id,
              input: {
                name: values.name,
                gmInspiration: values.gmInspiration,
              },
            },
          });
        }}
      >
        {({ handleReset }) => (
          <Form>
            <Grid container spacing={2} my={4}>
              <Grid item xs={12}></Grid>
              <Grid item xs={12} sm={6}>
                <Field name="name">
                  {({ field }: FieldProps<string>) => (
                    <TextField
                      required
                      id="name"
                      label="Campaign Name"
                      fullWidth
                      {...field}
                    />
                  )}
                </Field>
              </Grid>
              <Grid item xs={12} sm={6} sx={{ textAlign: "right", mt: 1 }}>
                <Field name="gmInspiration">
                  {({ field }: FieldProps<boolean>) => (
                    <FormControlLabel
                      id="gmInspiration"
                      label="GM Gets Inspiration"
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
              <Grid item xs={12} sx={{ textAlign: "right" }}>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleReset}
                  sx={{ mr: 2 }}
                >
                  Reset
                </Button>
                <Button variant="contained" color="primary" type="submit">
                  Save
                </Button>
              </Grid>
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
