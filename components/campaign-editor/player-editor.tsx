import { gql, useMutation } from "@apollo/client";
import { Button, Grid, IconButton, TextField } from "@mui/material";
import {
  Add as AddIcon,
  Edit as EditIcon,
  Remove as RemoveIcon,
} from "@mui/icons-material";
import { Box } from "@mui/system";
import { useState } from "react";

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

  mutation UPDATE_PLAYER($playerId: ID, $input: PlayerInput!) {
    player(id: $playerId) {
      save(input: $input) {
        ...PlayerFragment
      }
    }
  }
`;

interface PlayerEditorProps {
  player: {
    id?: string;
    playerName: string;
    characterName?: string;
    isGM: boolean;
    inspiration: number;
  };
}

export default function PlayerEditor({ player }: PlayerEditorProps) {
  const [editing, setEditing] = useState(false);
  const [setInspiration] = useMutation(SET_PLAYER_INSPIRATION);
  const [updatePlayer] = useMutation(UPDATE_PLAYER);
  console.log(player);

  return editing ? (
    <Grid container>
      <Grid item xs={12} sm={6} md={3}>
        Player Name
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        Character Name
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        Is GM
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <Button
          variant="contained"
          color="secondary"
          sx={{ mr: 1 }}
          onClick={() => setEditing(false)}
        >
          Cancel
        </Button>
        <Button variant="contained">Save</Button>
      </Grid>
    </Grid>
  ) : (
    <Grid container>
      <Grid item xs={8}>
        <Box component="span" sx={{ fontWeight: "bold", paddingRight: 1 }}>
          {player.playerName}
        </Box>
        <Box component="span" sx={{ color: "text.secondary" }}>
          ({player.isGM ? "GM" : player.characterName})
        </Box>
      </Grid>
      <Grid item xs={4} sx={{ display: "flex", justifyContent: "flex-end" }}>
        <IconButton
          onClick={() => {
            setInspiration({
              variables: {
                id: player.id,
                inspiration: Math.max(player.inspiration - 1, 0),
              },
            });
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
          sx={{ maxWidth: 50 }}
          value={player.inspiration}
          onChange={(event) => {
            setInspiration({
              variables: {
                id: player.id,
                inspiration: event.target.value
                  ? parseInt(event.target.value, 10)
                  : 0,
              },
            });
          }}
        />
        <IconButton
          onClick={() => {
            setInspiration({
              variables: {
                id: player.id,
                inspiration: player.inspiration + 1,
              },
            });
          }}
        >
          <AddIcon />
        </IconButton>
        <IconButton onClick={() => setEditing(true)}>
          <EditIcon />
        </IconButton>
      </Grid>
    </Grid>
  );
}
