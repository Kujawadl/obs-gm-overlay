import {
	Breadcrumbs,
	Container,
	Link as MUILink,
	Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
import { useRouter } from "next/router";
import CampaignEditor from "../../components/campaign-editor";
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
		data?.campaign && (
			<>
				<Head>
					<title>{data?.campaign.name} Details | OBS GM Overlay</title>
				</Head>
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
			</>
		)
	);
}
