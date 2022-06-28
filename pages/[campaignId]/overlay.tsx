import { useRouter } from "next/router";
import { gql, useSubscription } from "@apollo/client";
import Badge from "../../components/badge";
import { Box } from "@mui/material";
// import stripTypename from "../../utils/strip-typename";
// import { Typography } from "@mui/material";

const CAMPAIGN_SUBSCRIPTION = gql`
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

  subscription CAMPAIGN_SUBSCRIPTION($id: ID!) {
    campaign(id: $id) {
      ...CampaignFragment
    }
  }
`;

export default function Overlay() {
  const router = useRouter();
  const { campaignId } = router.query;
  const { data } = useSubscription(CAMPAIGN_SUBSCRIPTION, {
    variables: {
      id: campaignId,
    },
  });

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-around",
      }}
    >
      {data?.campaign.players.map((player) =>
        data.campaign.gmInspiration || !player.isGM ? (
          <Badge
            key={player.id}
            name={
              player.isGM || !player.characterName
                ? player.playerName
                : player.characterName
            }
            value={player.inspiration}
          />
        ) : null
      )}
    </Box>
  );
}
