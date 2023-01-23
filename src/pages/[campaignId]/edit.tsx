import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import CampaignEditor from "../../components/campaign-editor";
import { useCampaignSubscription } from "../../graphql/client-types";

export default function EditCampaign() {
	const router = useRouter();
	const { campaignId } = router.query;
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	return (
		data?.campaign && (
			<>
				<Head>
					<title>{`${
						data?.campaign.name ?? "Campaign"
					} Details | OBS GM Overlay`}</title>
				</Head>
				<Container fixed>
					<CampaignEditor campaign={data.campaign} />
				</Container>
			</>
		)
	);
}
