import { gql, useMutation } from "@apollo/client";
import {
  Button,
  CircularProgress,
  FormControlLabel,
  Grid,
  IconButton,
  Switch,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  Add as AddIcon,
  DoNotDisturbAlt as CancelIcon,
  Edit as EditIcon,
  Remove as RemoveIcon,
  Save as SaveIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { ChangeEvent, useCallback, useMemo, useState } from "react";
import { Field, FieldProps, Form, Formik } from "formik";
import * as Yup from "yup";

const SET_PLAYER_INSPIRATION = gql`
  fragment PlayerFragment on Player {
    id
    playerName
    characterName
    isGM
    inspiration
  }

  mutation SET_PLAYER_INSPIRATION($id: ID!, $inspiration: Int!) {
    player(id: $id) {
      save(input: { inspiration: $inspiration }) {
        ...PlayerFragment
      }
    }
  }
`;

const UPDATE_PLAYER = gql`
  fragment PlayerFragment on Player {
    id
    playerName
    characterName
    isGM
    inspiration
  }

  mutation UPDATE_PLAYER($id: ID, $input: PlayerInput!) {
    player(id: $id) {
      save(input: $input) {
        ...PlayerFragment
      }
    }
  }
`;

const validationSchema = Yup.object().shape({
  playerName: Yup.string().required("Player Name is required"),
});

interface PlayerEditorProps {
  player: {
    id?: string;
    playerName: string;
    characterName?: string;
    isGM: boolean;
    inspiration: number;
  };
  campaignId: string | number;
}

export default function PlayerEditor({
  player,
  campaignId,
}: PlayerEditorProps) {
  const [editing, setEditing] = useState(false);
  const [setInspiration] = useMutation(SET_PLAYER_INSPIRATION);
  const [updatePlayer, { loading: updatePlayerLoading }] =
    useMutation(UPDATE_PLAYER);
  const theme = useTheme();
  const isMobileView = useMediaQuery(theme.breakpoints.only("xs"));
  const ResponsiveButton = useMemo(
    () => (isMobileView ? (IconButton as typeof Button) : Button),
    [isMobileView]
  );

  const initialValues = useMemo(
    () => ({
      playerName: player.playerName,
      characterName: player.characterName,
      isGM: player.isGM,
    }),
    [player.playerName, player.characterName, player.isGM]
  );

  const onUpdatePlayer = useCallback(
    async (values: typeof initialValues) => {
      updatePlayer({
        variables: {
          id: player.id,
          input: {
            campaignId,
            ...values,
          },
        },
      }).then(() => {
        setEditing(false);
      });
    },
    [player.id, campaignId, updatePlayer]
  );

  const onSetInspiration = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setInspiration({
        variables: {
          id: player.id,
          inspiration: event.target.value
            ? parseInt(event.target.value, 10)
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
        inspiration: player.inspiration - 1,
      },
    });
  }, [player.id, player.inspiration, setInspiration]);

  return editing ? (
    <Formik
      initialValues={initialValues}
      onSubmit={onUpdatePlayer}
      validationSchema={validationSchema}
    >
      {({ values, isValid }) => (
        <Form style={{ flexBasis: "100%" }}>
          <Grid container spacing={2} alignItems="center" mr={-2}>
            <Grid item xs={8} md={3}>
              <Field name="playerName">
                {({ field, meta }: FieldProps<string>) => (
                  <TextField
                    required
                    id="playerName"
                    label="Player Name"
                    fullWidth
                    error={meta.touched && !!meta.error}
                    helperText={meta.touched ? meta.error : undefined}
                    {...field}
                  />
                )}
              </Field>
            </Grid>
            <Grid
              item
              xs={4}
              md={3}
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
            <Grid item xs={8} md={3}>
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
              item
              xs={4}
              md={3}
              sx={{ display: "flex", justifyContent: "flex-end" }}
            >
              <ResponsiveButton
                variant="contained"
                color="secondary"
                sx={{ mr: 1 }}
                onClick={() => setEditing(false)}
              >
                {isMobileView ? <CancelIcon /> : "Cancel"}
              </ResponsiveButton>
              {updatePlayerLoading ? (
                <CircularProgress />
              ) : (
                <ResponsiveButton
                  type="submit"
                  variant="contained"
                  color="primary"
                  disabled={!isValid || updatePlayerLoading}
                >
                  {isMobileView ? <SaveIcon /> : "Save"}
                </ResponsiveButton>
              )}
            </Grid>
          </Grid>
        </Form>
      )}
    </Formik>
  ) : (
    <Grid container alignItems="center">
      <Grid item xs={8}>
        <Box component="span" sx={{ fontWeight: "bold", paddingRight: 1 }}>
          {player.playerName}
        </Box>
        {!isMobileView && (
          <Box component="span" sx={{ color: "text.secondary" }}>
            ({player.isGM ? "GM" : player.characterName})
          </Box>
        )}
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton onClick={onDecrement}>
          <RemoveIcon />
        </IconButton>
        <TextField
          inputProps={{
            inputMode: "numeric",
            pattern: "[0-9]*",
            style: { textAlign: "center" },
          }}
          size="small"
          sx={{ minWidth: 50, maxWidth: 50 }}
          value={player.inspiration}
          onChange={onSetInspiration}
        />
        <IconButton onClick={onIncrement}>
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
