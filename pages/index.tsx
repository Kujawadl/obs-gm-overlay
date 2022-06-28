import type { NextPage } from "next";
import { useQuery, gql } from "@apollo/client";
import {
  Box,
  Breadcrumbs,
  Container,
  Link as MUILink,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
} from "@mui/material";
import {
  Edit as EditIcon,
  OpenInNew as OpenInNewIcon,
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
      <Breadcrumbs aria-label="breadcrumb" sx={{ pt: 4, pb: 2 }}>
        <Typography color="text.primary">Campaigns</Typography>
      </Breadcrumbs>
      <Typography variant="h3">Campaigns</Typography>
      <List
        sx={{
          marginTop: 2,
          paddingTop: 0,
          border: 0,
          borderTop: 2,
          borderStyle: "solid",
          borderColor: "primary.light",
        }}
      >
        {data.campaigns?.length > 0 ? (
          data.campaigns.map((campaign) => (
            <>
              <ListItemButton>
                <ListItemText>
                  <Typography variant="h5">{campaign.name}</Typography>
                </ListItemText>
              </ListItemButton>
              <List
                component="div"
                disablePadding
                sx={{
                  border: 0,
                  borderBottom: 1,
                  borderStyle: "solid",
                  borderColor: "grey.400",
                  marginBottom: 1,
                }}
              >
                <Link href={`/${campaign.id}/edit`}>
                  <ListItemButton component="a" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <EditIcon />
                    </ListItemIcon>
                    <ListItemText primary="Edit" />
                  </ListItemButton>
                </Link>
                <MUILink
                  component="a"
                  underline="none"
                  color="inherit"
                  href={`/${campaign.id}/overlay`}
                  target="_blank"
                  rel="noreferrer"
                >
                  <ListItemButton component="a" sx={{ pl: 4 }}>
                    <ListItemIcon>
                      <PreviewIcon />
                    </ListItemIcon>
                    <ListItemText
                      primary={
                        <Box sx={{ display: "flex", alignItems: "baseline" }}>
                          Preview Overlay
                          <Box sx={{ fontSize: "0.8rem", marginLeft: 0.5 }}>
                            <OpenInNewIcon fontSize="inherit" />
                          </Box>
                        </Box>
                      }
                    />
                  </ListItemButton>
                </MUILink>
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
