import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	PlayArrow as PlayArrowIcon,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	ListItem,
	ListItemText,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/router";
import { useCallback, useState } from "react";
import {
	CampaignFragment,
	EncounterDetailDocument,
	EncounterFragment,
	useDeleteEncounterMutation,
	useSetActiveEncounterMutation,
} from "../../graphql/client-types";

export interface EncounterRowProps {
	campaign: CampaignFragment;
	encounter: EncounterFragment;
	refetch: () => void;
}

export default function EncounterRow({
	campaign,
	encounter,
	refetch,
}: EncounterRowProps) {
	const router = useRouter();
	const [deleteCampaign] = useDeleteEncounterMutation({
		variables: { campaignId: campaign.id, encounterId: encounter?.id },
	});
	const [setActive] = useSetActiveEncounterMutation({
		variables: {
			campaignId: campaign.id,
			encounterId: encounter.id,
		},
		refetchQueries: [EncounterDetailDocument],
	});

	const [deleting, setDeleting] = useState(false);
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.only("xs"));

	const onSetActive = useCallback(() => {
		setActive().then(({ data }) => {
			if (data?.campaign?.encounter?.setActive) {
				router.push(`/${campaign.id}/encounter/run`);
			} else {
				// TODO: Display an error here
			}
		});
	}, [setActive, router, campaign.id]);

	return (
		<>
			<ListItem
				key={encounter.id}
				sx={{
					flexWrap: "wrap",
					border: 0,
					borderBottom: 1,
					borderStyle: "solid",
					borderColor: "grey.400",
				}}
			>
				<ListItemText sx={{ flexBasis: "100%" }}>
					<Box display="flex" justifyContent="space-between" width="100%">
						<Typography variant="h5" component="span">
							{encounter.name}
						</Typography>
						{encounter.round > 0 ? (
							<Typography variant="h6" color="text.secondary" component="span">
								(Round {encounter.round})
							</Typography>
						) : null}
					</Box>
				</ListItemText>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						flexWrap: "wrap",
						width: "100%",
					}}
				>
					<Box
						sx={{
							flexGrow: 1,
							flexBasis: isMobileView ? "100%" : "auto",
						}}
					>
						<Link href={`/${campaign.id}/encounter/${encounter.id}/edit`}>
							<Button component="a">
								<EditIcon sx={{ paddingRight: 1, fontSize: "1.8rem" }} />
								Edit
							</Button>
						</Link>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							flexBasis: isMobileView ? "100%" : "auto",
						}}
					>
						<Button onClick={onSetActive}>
							<PlayArrowIcon sx={{ paddingRight: 1, fontSize: "1.8rem" }} />
							<Box sx={{ display: "flex", alignItems: "baseline", width: 70 }}>
								{encounter.round > 0 ? "Resume" : "Run"}
							</Box>
						</Button>
					</Box>
					<Box
						sx={{
							flexBasis: isMobileView ? "100%" : "auto",
						}}
					>
						<Button color="error" onClick={() => setDeleting(true)}>
							<DeleteIcon sx={{ paddingRight: 1, fontSize: "1.8rem" }} />
							Delete
						</Button>
					</Box>
				</Box>
			</ListItem>
			<Dialog open={deleting} onClose={() => setDeleting(false)}>
				<DialogTitle>Delete encounter {encounter.name}?</DialogTitle>
				<DialogContent>
					<DialogContentText>This action cannot be undone.</DialogContentText>
				</DialogContent>
				<DialogActions>
					<Button variant="contained" onClick={() => setDeleting(false)}>
						Cancel
					</Button>
					<Button
						variant="contained"
						onClick={() => {
							deleteCampaign().then(({ data }) => {
								if (data?.campaign?.encounter?.delete) {
									refetch();
									setDeleting(false);
								} else {
									// TODO: Display an error here
								}
							});
						}}
						color="error"
					>
						<DeleteIcon /> Delete
					</Button>
				</DialogActions>
			</Dialog>
		</>
	);
}
