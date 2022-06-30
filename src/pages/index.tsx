import { gql, useMutation, useQuery } from "@apollo/client";
import { Add as AddIcon } from "@mui/icons-material";
import { Box, Breadcrumbs, Button, Container, Typography } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import { useCallback } from "react";
import CampaignList from "../components/campaign-list";

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

const ADD_CAMPAIGN = gql`
  mutation UPDATE_CAMPAIGN($input: CampaignInput!) {
    campaign {
      save(input: $input) {
        id
      }
    }
  }
`;

interface CampaignQuery {
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

interface SaveCampaignMutation {
  campaign: {
    save: CampaignQuery["campaign"];
  };
}

interface CampaignsQuery {
  campaigns: CampaignQuery["campaign"][];
}

export default function Home() {
  const { data, refetch } = useQuery<CampaignsQuery>(LIST_CAMPAIGNS);
  const [addCampaign] = useMutation<SaveCampaignMutation>(ADD_CAMPAIGN);
  const router = useRouter();

  const onAddCampaign = useCallback(() => {
    addCampaign({
      variables: {
        input: {
          name: "New Campaign",
        },
      },
    }).then(({ data }) => {
      if (data) {
        router.push(`/${data.campaign.save.id}/edit`);
      } else {
        // TODO: Display an error here
      }
      refetch();
    });
  }, [addCampaign, router, refetch]);

  return data ? (
    <>
      <Head>
        <title>List Campaigns | OBS GM Overlay</title>
      </Head>
      <Container fixed>
        <Breadcrumbs aria-label="breadcrumb" sx={{ pt: 4, pb: 2 }}>
          <Typography color="text.primary">Campaigns</Typography>
        </Breadcrumbs>
        <Typography variant="h3">Campaigns</Typography>
        <CampaignList campaigns={data.campaigns} refetch={refetch} />
        <Box sx={{ display: "flex", justifyContent: "flex-end" }}>
          <Button variant="contained" color="success" onClick={onAddCampaign}>
            <AddIcon /> New Campaign
          </Button>
        </Box>
      </Container>
    </>
  ) : null;
}
