import {
	Breadcrumbs,
	Container,
	Link as MUILink,
	Typography,
} from "@mui/material";
import Head from "next/head";
import Link from "next/link";
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
					<Breadcrumbs aria-label="breadcrumb" sx={{ pt: 4, pb: 2 }}>
						<Link href="/">
							<MUILink component="a" underline="hover" color="inherit">
								Campaigns
							</MUILink>
						</Link>
						<Link href={`/${campaignId}/edit`}>
							<MUILink component="a" underline="hover" color="inherit">
								{campaignData.campaign.name}
							</MUILink>
						</Link>
						<Link href={`/${campaignId}/encounter`}>
							<MUILink component="a" underline="hover" color="inherit">
								Encounters
							</MUILink>
						</Link>
						<Typography color="text.primary">
							{data.campaign.encounter.name}
						</Typography>
					</Breadcrumbs>
					<EncounterEditor
						campaign={campaignData.campaign}
						encounter={data.campaign.encounter}
					/>
				</Container>
			</>
		)
	);
}
