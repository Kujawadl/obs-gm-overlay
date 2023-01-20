import { List, ListItem, ListItemText } from "@mui/material";
import EncounterRow, { EncounterRowProps } from "./encounter-row";
import type { CampaignFragment } from "../../graphql/client-types";

interface EncounterListProps {
	campaign: CampaignFragment;
	encounters?: EncounterRowProps["encounter"][];
	refetch: () => void;
}

export default function EncounterList({
	campaign,
	encounters,
	refetch,
}: EncounterListProps) {
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
			{encounters && encounters.length > 0 ? (
				encounters.map((encounter) => (
					<EncounterRow
						key={encounter.id}
						campaign={campaign}
						encounter={encounter}
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
					<ListItemText>No Encounters Found...</ListItemText>
				</ListItem>
			)}
		</List>
	);
}
