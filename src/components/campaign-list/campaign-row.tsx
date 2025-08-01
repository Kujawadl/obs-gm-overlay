import {
	Delete as DeleteIcon,
	Edit as EditIcon,
	List as ListIcon,
	OpenInNew as OpenInNewIcon,
	Preview as PreviewIcon,
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
	Menu,
	MenuItem,
	Link as MUILink,
	Typography,
	useMediaQuery,
	useTheme,
} from "@mui/material";
import Link from "next/link";
import React, { useState } from "react";
import {
	CampaignFragment,
	useDeleteCampaignMutation,
} from "../../graphql/client-types";

export interface CampaignRowProps {
	campaign: CampaignFragment;
	refetch: () => void;
}

export default function CampaignRow({ campaign, refetch }: CampaignRowProps) {
	const [deleteCampaign] = useDeleteCampaignMutation({
		variables: { id: campaign.id },
	});
	const [deleting, setDeleting] = useState(false);

	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handleClose = () => {
		setAnchorEl(null);
	};

	const theme = useTheme();
	const isMobileView = useMediaQuery(theme.breakpoints.only("xs"));

	return (
		<>
			<ListItem
				key={campaign.id}
				sx={{
					flexWrap: "wrap",
					border: 0,
					borderBottom: 1,
					borderStyle: "solid",
					borderColor: "grey.400",
				}}
			>
				<ListItemText sx={{ flexBasis: "100%" }}>
					<Typography variant="h5">{campaign.name}</Typography>
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
						<Link href={`/${campaign.id}/edit`}>
							<Button component="span">
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
						<Link href={`/${campaign.id}/encounter`}>
							<Button component="span">
								<ListIcon sx={{ paddingRight: 1, fontSize: "1.8rem" }} />
								Encounters
							</Button>
						</Link>
					</Box>
					<Box
						sx={{
							flexGrow: 1,
							flexBasis: isMobileView ? "100%" : "auto",
						}}
					>
						<Button
							onClick={handleOpen}
							aria-label="preview overlay"
							aria-controls="menu-overlays"
							aria-haspopup="true"
						>
							<PreviewIcon sx={{ paddingRight: 1, fontSize: "1.8rem" }} />
							<Box sx={{ display: "flex", alignItems: "baseline" }}>
								Preview Overlay
							</Box>
						</Button>
						<Menu
							id="menu-overlays"
							anchorEl={anchorEl}
							keepMounted
							open={!!anchorEl}
							onClose={handleClose}
						>
							<MenuItem>
								<MUILink
									component="a"
									underline="none"
									color="inherit"
									href={`/${campaign.id}/overlay/inspiration`}
									target="_blank"
									rel="noreferrer"
									onClick={() => handleClose()}
								>
									<Box sx={{ display: "flex", alignItems: "baseline" }}>
										Inspiration
										<OpenInNewIcon
											sx={{ fontSize: "0.8rem", marginLeft: 0.5 }}
										/>
									</Box>
								</MUILink>
							</MenuItem>
							<MenuItem>
								<MUILink
									component="a"
									underline="none"
									color="inherit"
									href={`/${campaign.id}/overlay/initiative`}
									target="_blank"
									rel="noreferrer"
									onClick={() => handleClose()}
								>
									<Box sx={{ display: "flex", alignItems: "baseline" }}>
										Initiative
										<OpenInNewIcon
											sx={{ fontSize: "0.8rem", marginLeft: 0.5 }}
										/>
									</Box>
								</MUILink>
							</MenuItem>
						</Menu>
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
				<DialogTitle>
					Delete campaign {campaign.name} and all of its players?
				</DialogTitle>
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
								if (data?.campaign?.delete) {
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
