import { gql, useQuery } from "@apollo/client";
import {
  Breadcrumbs,
  Container,
  Link as MUILink,
  Typography,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import CampaignEditor from "../../components/campaign-editor";

const CAMPAIGN_QUERY = gql`
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

  query CAMPAIGN_QUERY($id: ID!) {
    campaign(id: $id) {
      ...CampaignFragment
    }
  }
`;

export default function Overlay() {
  const router = useRouter();
  const { campaignId } = router.query;
  const { data } = useQuery(CAMPAIGN_QUERY, {
    variables: {
      id: campaignId,
    },
  });

  return (
    data && (
      <Container fixed>
        <Breadcrumbs aria-label="breadcrumb" sx={{ pt: 4, pb: 2 }}>
          <Link href="/">
            <MUILink component="a" underline="hover" color="inherit">
              Campaigns
            </MUILink>
          </Link>
          <Typography color="text.primary">
            {data.campaign.name} (Edit)
          </Typography>
        </Breadcrumbs>
        <CampaignEditor campaign={data.campaign} />
      </Container>
    )
  );
}
