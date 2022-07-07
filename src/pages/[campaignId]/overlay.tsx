import { useRouter } from "next/router";
import { Box } from "@mui/material";
import Head from "next/head";
import Badge from "../../components/badge";
import { useCampaignSubscription } from "../../graphql";

export default function Overlay() {
  const router = useRouter();
  const { campaignId } = router.query;
  const { data } = useCampaignSubscription({
    variables: {
      id: campaignId as string,
    },
  });

  return (
    <>
      <Head>
        <title>{data?.campaign?.name} Overlay | OBS GM Overlay</title>
      </Head>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
        }}
      >
        {data?.campaign?.players.map((player) =>
          data?.campaign?.gmInspiration || !player.isGM ? (
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
    </>
  );
}
