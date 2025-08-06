import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import EncounterEditor from "@src/components/encounter-editor";
import {
	useCampaignSubscription,
	useEncounterDetailQuery,
} from "@graphql/client-types";

export default function Overlay() {
	const { campaignId, encounterId } = useParams();
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
