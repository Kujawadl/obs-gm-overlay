import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import {
  Container,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  Visibility as PreviewIcon,
} from "@mui/icons-material";
import Link from "next/link";

const LIST_CAMPAIGNS = gql`
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

  query LIST_CAMPAIGNS {
    campaigns {
      ...CampaignFragment
    }
  }
`;

const Home: NextPage = () => {
  const { data, loading, error } = useQuery(LIST_CAMPAIGNS);

  return loading || error ? null : (
    <Container fixed>
      <Typography variant="h3">Campaigns</Typography>
      <List>
        {data.campaigns?.length > 0 ? (
          data.campaigns.map((campaign) => (
            <>
              <ListItemButton>
                <ListItemText primary={campaign.name} />
              </ListItemButton>
              <List component="div" disablePadding>
                <Link href={`/${campaign.id}/edit`}>
                  <ListItemButton component="a" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </ListItemButton>
                </Link>
                <Link href={`/${campaign.id}/overlay`}>
                  <ListItemButton component="a" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PreviewIcon />
                    </ListItemIcon>
                    <ListItemText primary="Preview Overlay" />
                  </ListItemButton>
                </Link>
              </List>
            </>
          ))
        ) : (
          <ListItemText>No Campaigns Found...</ListItemText>
        )}
      </List>
    </Container>
  );
};

export default Home;
