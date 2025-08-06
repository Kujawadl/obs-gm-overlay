import { Container } from "@mui/material";
import { useParams } from "react-router-dom";
import CampaignEditor from "@src/components/campaign-editor";
import { useCampaignSubscription } from "@graphql/client-types";

export default function EditCampaign() {
	const { campaignId } = useParams();
	const { data } = useCampaignSubscription({
		variables: {
			id: campaignId as string,
		},
	});

	return (
		data?.campaign && (
			<Container fixed>
				<CampaignEditor campaign={data.campaign} />
			</Container>
		)
	);
}
