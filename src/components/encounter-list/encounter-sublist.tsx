import { Box, List, ListItem, ListItemText, Typography } from "@mui/material";
import type { CampaignFragment } from "@graphql/client-types";
import EncounterRow, {
	EncounterRowProps,
} from "@src/components/encounter-list/encounter-row";

interface EncounterSubListProps {
	listName: string;
	noEncountersMessage: string;
	campaign: CampaignFragment;
	encounters?: EncounterRowProps["encounter"][];
	refetch: () => void;
}

export default function EncounterSubList({
	listName,
	noEncountersMessage,
	campaign,
	encounters,
	refetch,
}: EncounterSubListProps) {
	return (
		<Box mt={4}>
			<Typography variant="h4">{listName}</Typography>
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
						<ListItemText>{noEncountersMessage}</ListItemText>
					</ListItem>
				)}
			</List>
		</Box>
	);
}
