import { Container } from "@mui/material";
import Head from "next/head";
import { useRouter } from "next/router";
import EncounterEditor from "../../../../components/encounter-editor";
import {
	useCampaignSubscription,
	useEncounterDetailQuery,
} from "../../../../graphql/client-types";

export default function Overlay() {
	const router = useRouter();
	const { campaignId, encounterId } = router.query;
	const { data: campaignData } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});
	const { data } = useEncounterDetailQuery({
		variables: {
			campaignId: campaignId as string,
			encounterId: encounterId as string,
		},
		skip: !(campaignId && encounterId),
	});

	return (
		campaignData?.campaign &&
		data?.campaign?.encounter && (
			<>
				<Head>
					<title>{`${
						campaignData.campaign.name ?? "Campaign"
					} Details | OBS GM Overlay`}</title>
				</Head>
				<Container fixed>
					<EncounterEditor
						campaign={campaignData.campaign}
						encounter={data.campaign.encounter}
					/>
				</Container>
			</>
		)
	);
}
