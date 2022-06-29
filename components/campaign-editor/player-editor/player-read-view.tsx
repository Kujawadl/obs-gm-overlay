import { gql, useMutation } from "@apollo/client";
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

const DELETE_PLAYER = gql`
  mutation SET_PLAYER_INSPIRATION($id: ID!) {
    player(id: $id) {
      delete
    }
  }
`;

interface PlayerReadViewProps {
  player: {
    id?: string;
    playerName: string;
    characterName?: string;
    isGM: boolean;
    inspiration: number;
  };
  gmInspiration: boolean;
  setEditing: Dispatch<SetStateAction<boolean>>;
}

export default function PlayerReadView({
  player,
  gmInspiration,
  setEditing,
}: PlayerReadViewProps) {
  const [open, setOpen] = useState(false);
  const [setInspiration] = useMutation(SET_PLAYER_INSPIRATION);
  const [deletePlayer] = useMutation(DELETE_PLAYER, {
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
            visibility: gmInspiration || !player.isGM ? "visible" : "hidden",
          }}
        >
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
