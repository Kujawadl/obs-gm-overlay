import { useRouter } from "next/router";
import { gql, useSubscription } from "@apollo/client";
import stripTypename from "../../utils/strip-typename";

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
    <pre style={{ fontSize: 12 }}>
      <code>{JSON.stringify(stripTypename(data?.campaign), undefined, 2)}</code>
    </pre>
  );
}
