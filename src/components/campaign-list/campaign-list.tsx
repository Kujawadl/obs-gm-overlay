import { List, ListItem, ListItemText } from "@mui/material";
import CampaignRow, { CampaignRowProps } from "./campaign-row";

interface CampaignListProps {
	campaigns?: CampaignRowProps["campaign"][];
	refetch: () => void;
}

export default function CampaignList({
	campaigns,
	refetch,
}: CampaignListProps) {
	return (
		<List
			sx={{
				marginTop: 2,
				paddingTop: 0,
				border: 0,
				borderTop: 2,
				borderStyle: "solid",
				borderColor: "primary.light",
			}}
		>
			{campaigns && campaigns.length > 0 ? (
				campaigns.map((campaign) => (
					<CampaignRow
						key={campaign.id}
						campaign={campaign}
						refetch={refetch}
					/>
				))
			) : (
				<ListItem
					sx={{
						border: 0,
						borderBottom: 1,
						borderStyle: "solid",
						borderColor: "grey.400",
					}}
				>
					<ListItemText>No Campaigns Found...</ListItemText>
				</ListItem>
			)}
		</List>
	);
}
