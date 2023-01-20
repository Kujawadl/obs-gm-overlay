import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	PlayArrow as PlayArrowIcon,
	Preview as PreviewIcon,
	OpenInNew as OpenInNewIcon,
} from "@mui/icons-material";
import {
	Box,
	Button,
	Dialog,
	DialogActions,
	DialogContent,
	DialogContentText,
	DialogTitle,
	Link as MUILink,
	ListItem,
	ListItemText,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Link from "next/link";
import { useState } from "react";
import {
	CampaignFragment,
	EncounterFragment,
	useDeleteEncounterMutation,
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
	const [deleteCampaign] = useDeleteEncounterMutation({
		variables: { campaignId: campaign.id, encounterId: encounter?.id },
	});
	const [deleting, setDeleting] = useState(false);
	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.only("xs"));

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
					<Typography variant="h5">{encounter.name}</Typography>
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
						<MUILink
							component="a"
							underline="none"
							color="inherit"
							href={`/${campaign.id}/encounter/${encounter.id}/run`}
						>
							<Button>
								<PlayArrowIcon sx={{ paddingRight: 1, fontSize: "1.8rem" }} />
								<Box sx={{ display: "flex", alignItems: "baseline" }}>Run</Box>
							</Button>
						</MUILink>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							flexBasis: isMobileView ? "100%" : "auto",
						}}
					>
						<MUILink
							component="a"
							underline="none"
							color="inherit"
							href={`/${campaign.id}/overlay/initiative`}
							target="_blank"
							rel="noreferrer"
						>
							<Button>
								<PreviewIcon sx={{ paddingRight: 1, fontSize: "1.8rem" }} />
								<Box sx={{ display: "flex", alignItems: "baseline" }}>
									Preview Overlay
									<OpenInNewIcon sx={{ fontSize: "0.8rem", marginLeft: 0.5 }} />
								</Box>
							</Button>
						</MUILink>
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
